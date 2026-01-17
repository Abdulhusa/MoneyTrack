import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseList from '../components/ExpenseList';

/**
 * Home Dashboard Component
 * Displays expense statistics, chart, and transaction list
 */
const Home = () => {
  const { user, expenses, stats, fetchExpenses, fetchStats, logout } = useExpense();

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [fetchExpenses, fetchStats]);

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">MoneyTrack</h1>
              <p className="text-gray-600 text-sm">Welcome, {user?.username}!</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalIncome)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expense</h3>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(stats.totalExpense)}</p>
          </div>

          <div
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
              stats.balance >= 0 ? 'border-blue-500' : 'border-orange-500'
            }`}
          >
            <h3 className="text-gray-600 text-sm font-medium mb-2">Balance</h3>
            <p
              className={`text-3xl font-bold ${
                stats.balance >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}
            >
              {formatCurrency(stats.balance)}
            </p>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="mb-6">
          <Link
            to="/home/add"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Transaction
          </Link>
        </div>

        {/* Chart and List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Expense by Category</h2>
            <ExpenseChart categoryBreakdown={stats.categoryBreakdown} expenses={expenses} />
          </div>

          {/* Recent Transactions Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense._id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{expense.title}</p>
                      <p className="text-sm text-gray-600">{expense.category}</p>
                    </div>
                    <p
                      className={`font-semibold ${
                        expense.type === 'Income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {expense.type === 'Income' ? '+' : '-'}
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                ))}
                {expenses.length > 5 && (
                  <Link
                    to="/home"
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                  >
                    View all transactions →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            )}
          </div>
        </div>

        {/* Full Transaction List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Transactions</h2>
          <ExpenseList expenses={expenses} />
        </div>
      </main>
    </div>
  );
};

export default Home;

