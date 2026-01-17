import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import UpdateExpense from './pages/UpdateExpense';
import RemoveExpense from './pages/RemoveExpense';

/**
 * Main App Component
 * Sets up routing and context providers
 */
function App() {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/add"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/update"
            element={
              <ProtectedRoute>
                <UpdateExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/remove"
            element={
              <ProtectedRoute>
                <RemoveExpense />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
