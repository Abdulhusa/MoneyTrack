import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * Expense Chart Component
 * Displays a pie chart of expenses by category using Recharts
 * Only shows Expense type transactions, not Income
 */
const ExpenseChart = ({ categoryBreakdown, expenses = [] }) => {
  // Calculate expense-only breakdown from expenses list for accurate data
  // This ensures we only show Expense type, not Income categories
  const expenseData = useMemo(() => {
    // If expenses array is available, use it for accurate filtering
    if (expenses && expenses.length > 0) {
      const expenseMap = new Map();
      
      // Aggregate only Expense type transactions
      expenses
        .filter((exp) => exp.type === 'Expense')
        .forEach((exp) => {
          const category = exp.category || 'Other';
          const amount = parseFloat(exp.amount) || 0;
          
          if (amount > 0) {
            if (expenseMap.has(category)) {
              expenseMap.set(category, expenseMap.get(category) + amount);
            } else {
              expenseMap.set(category, amount);
            }
          }
        });

      // Convert to array and sort by amount (descending) for stable order
      const data = Array.from(expenseMap.entries())
        .map(([name, value]) => ({
          name: name || 'Other',
          value: Math.abs(value),
        }))
        .filter((item) => item.value > 0) // Ensure only positive values
        .sort((a, b) => {
          // Sort by value descending, then by name alphabetically for stability
          if (Math.abs(b.value - a.value) > 0.01) {
            return b.value - a.value;
          }
          return (a.name || '').localeCompare(b.name || '');
        });

      return data;
    }

    // Fallback to categoryBreakdown if expenses not available
    // Filter to only show categories with positive expense values
    if (categoryBreakdown && categoryBreakdown.length > 0) {
      return categoryBreakdown
        .map((item) => ({
          name: item._id || 'Other',
          value: Math.abs(item.total || 0),
        }))
        .filter((item) => item.value > 0)
        .sort((a, b) => {
          if (Math.abs(b.value - a.value) > 0.01) {
            return b.value - a.value;
          }
          return (a.name || '').localeCompare(b.name || '');
        });
    }

    return [];
  }, [expenses, categoryBreakdown]);

  // Color palette for chart segments (in fixed order for stability)
  const COLORS = [
    '#ef4444', // red
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
    '#14b8a6', // teal
    '#a855f7', // violet
  ];

  if (expenseData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No expense data to display</p>
      </div>
    );
  }

  // Generate stable keys for chart cells based on category name and value
  const getCellKey = (entry, index) => {
    return `cell-${entry.name}-${entry.value.toFixed(2)}-${index}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={400}
        >
          {expenseData.map((entry, index) => (
            <Cell key={getCellKey(entry, index)} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `₹${new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(value)}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;

