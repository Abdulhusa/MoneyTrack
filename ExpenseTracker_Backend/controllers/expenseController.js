import Expense from '../models/Expense.js';

/**
 * Get all expenses for the authenticated user
 * GET /api/expenses
 */
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Optional query parameters for filtering
    const { type, category, startDate, endDate } = req.query;

    // Build query
    const query = { user: userId };

    if (type && (type === 'Income' || type === 'Expense')) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    // Fetch expenses sorted by date (newest first)
    const expenses = await Expense.find(query).sort({ date: -1 });

    res.json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error while fetching expenses' });
  }
};

/**
 * Get a single expense by ID
 * GET /api/expenses/:id
 */
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({
      success: true,
      expense,
    });
  } catch (error) {
    console.error('Get expense by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }
    res.status(500).json({ message: 'Server error while fetching expense' });
  }
};

/**
 * Create a new expense
 * POST /api/expenses
 */
export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const userId = req.user._id;

    // Validation
    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: 'Please provide title, amount, type, and category',
      });
    }

    if (type !== 'Income' && type !== 'Expense') {
      return res.status(400).json({
        message: 'Type must be either Income or Expense',
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than 0',
      });
    }

    // Create expense
    const expense = new Expense({
      title,
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
      user: userId,
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense,
    });
  } catch (error) {
    console.error('Add expense error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    res.status(500).json({ message: 'Server error while adding expense' });
  }
};

/**
 * Update an expense by ID
 * PUT /api/expenses/:id
 */
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { title, amount, type, category, date } = req.body;

    // Find expense and verify ownership
    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update fields if provided
    if (title !== undefined) expense.title = title;
    if (amount !== undefined) {
      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
      }
      expense.amount = amount;
    }
    if (type !== undefined) {
      if (type !== 'Income' && type !== 'Expense') {
        return res.status(400).json({ message: 'Type must be either Income or Expense' });
      }
      expense.type = type;
    }
    if (category !== undefined) expense.category = category;
    if (date !== undefined) expense.date = new Date(date);

    await expense.save();

    res.json({
      success: true,
      message: 'Expense updated successfully',
      expense,
    });
  } catch (error) {
    console.error('Update expense error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    res.status(500).json({ message: 'Server error while updating expense' });
  }
};

/**
 * Delete an expense by ID
 * DELETE /api/expenses/:id
 */
export const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find expense and verify ownership
    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Delete expense
    await Expense.deleteOne({ _id: id, user: userId });

    res.json({
      success: true,
      message: 'Expense deleted successfully',
      deletedExpense: expense,
    });
  } catch (error) {
    console.error('Remove expense error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }
    res.status(500).json({ message: 'Server error while deleting expense' });
  }
};

/**
 * Get expense statistics for the authenticated user
 * GET /api/expenses/stats
 */
export const getExpenseStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Aggregate statistics
    const stats = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ['$type', 'Income'] }, '$amount', 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ['$type', 'Expense'] }, '$amount', 0] },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Get category breakdown
    const categoryBreakdown = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const result = stats[0] || {
      totalIncome: 0,
      totalExpense: 0,
      count: 0,
    };

    result.balance = result.totalIncome - result.totalExpense;
    result.categoryBreakdown = categoryBreakdown;

    res.json({
      success: true,
      stats: result,
    });
  } catch (error) {
    console.error('Get expense stats error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
};

