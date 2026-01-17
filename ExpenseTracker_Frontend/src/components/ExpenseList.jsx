import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';

/**
 * Expense List Component
 * Displays all transactions with options to edit and delete
 */
const ExpenseList = ({ expenses }) => {
  const { removeExpense } = useExpense();
  const [deletingId, setDeletingId] = useState(null);

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setDeletingId(id);
      try {
        await removeExpense(id);
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No transactions found</p>
        <Link
          to="/home/add"
          className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
        >
          Add Your First Transaction
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-800 font-medium">{expense.title}</td>
              <td className="py-3 px-4 text-gray-600">{expense.category}</td>
              <td className="py-3 px-4 text-gray-600">{formatDate(expense.date)}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    expense.type === 'Income'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {expense.type}
                </span>
              </td>
              <td
                className={`py-3 px-4 text-right font-semibold ${
                  expense.type === 'Income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {expense.type === 'Income' ? '+' : '-'}
                {formatCurrency(expense.amount)}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center items-center space-x-2">
                  <Link
                    to={`/home/update?id=${expense._id}`}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    disabled={deletingId === expense._id}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {deletingId === expense._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;

