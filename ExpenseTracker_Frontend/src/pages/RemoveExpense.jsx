import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';

/**
 * Remove Expense Page Component
 * Handles deletion of expenses via query parameter
 */
const RemoveExpense = () => {
  const [searchParams] = useSearchParams();
  const expenseId = searchParams.get('id');
  const navigate = useNavigate();
  const { removeExpense } = useExpense();

  useEffect(() => {
    const handleRemove = async () => {
      if (!expenseId) {
        navigate('/home', { replace: true });
        return;
      }

      // Confirm deletion
      if (window.confirm('Are you sure you want to delete this transaction?')) {
        const result = await removeExpense(expenseId);
        if (result.success) {
          navigate('/home', { replace: true });
        } else {
          alert(result.error || 'Failed to delete transaction');
          navigate('/home', { replace: true });
        }
      } else {
        navigate('/home', { replace: true });
      }
    };

    handleRemove();
  }, [expenseId, navigate, removeExpense]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing deletion...</p>
      </div>
    </div>
  );
};

export default RemoveExpense;

