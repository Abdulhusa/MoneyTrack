import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';

/**
 * Expense Context
 * Manages global state for expenses and user authentication
 */

// Initial state
const initialState = {
  user: null,
  expenses: [],
  loading: false,
  error: null,
  stats: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryBreakdown: [],
  },
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
  SET_EXPENSES: 'SET_EXPENSES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  SET_STATS: 'SET_STATS',
};

// Reducer function
const expenseReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ActionTypes.SET_USER:
      return { ...state, user: action.payload, error: null };

    case ActionTypes.CLEAR_USER:
      return { ...state, user: null, expenses: [], stats: initialState.stats };

    case ActionTypes.SET_EXPENSES:
      return { ...state, expenses: action.payload, loading: false, error: null };

    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        loading: false,
        error: null,
      };

    case ActionTypes.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp._id === action.payload._id ? action.payload : exp
        ),
        loading: false,
        error: null,
      };

    case ActionTypes.REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp._id !== action.payload),
        loading: false,
        error: null,
      };

    case ActionTypes.SET_STATS:
      return { ...state, stats: action.payload, loading: false, error: null };

    default:
      return state;
  }
};

// Create context
const ExpenseContext = createContext();

/**
 * Expense Provider Component
 */
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
        fetchExpenses();
        fetchStats();
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: ActionTypes.SET_USER, payload: user });
      await fetchExpenses();
      await fetchStats();

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  /**
   * Signup user
   */
  const signup = async (username, email, password) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await api.post('/auth/signup', { username, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: ActionTypes.SET_USER, payload: user });
      await fetchExpenses();
      await fetchStats();

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: ActionTypes.CLEAR_USER });
  };

  /**
   * Fetch all expenses
   */
  const fetchExpenses = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await api.get('/expenses');
      dispatch({ type: ActionTypes.SET_EXPENSES, payload: response.data.expenses });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch expenses';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
    }
  };

  /**
   * Add new expense
   */
  const addExpense = async (expenseData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await api.post('/expenses', expenseData);
      dispatch({ type: ActionTypes.ADD_EXPENSE, payload: response.data.expense });
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add expense';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  /**
   * Update expense
   */
  const updateExpense = async (id, expenseData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await api.put(`/expenses/${id}`, expenseData);
      dispatch({ type: ActionTypes.UPDATE_EXPENSE, payload: response.data.expense });
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update expense';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  /**
   * Remove expense
   */
  const removeExpense = async (id) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await api.delete(`/expenses/${id}`);
      dispatch({ type: ActionTypes.REMOVE_EXPENSE, payload: id });
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete expense';
      dispatch({ type: ActionTypes.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  /**
   * Fetch statistics
   */
  const fetchStats = async () => {
    try {
      const response = await api.get('/expenses/stats');
      dispatch({ type: ActionTypes.SET_STATS, payload: response.data.stats });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    fetchExpenses,
    addExpense,
    updateExpense,
    removeExpense,
    fetchStats,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

/**
 * Custom hook to use Expense Context
 */
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};

