import express from 'express';
import {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  removeExpense,
  getExpenseStats,
} from '../controllers/expenseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Expense Routes
 * All routes are protected and require authentication
 */
router.use(authenticate); // Apply authentication middleware to all routes

router.get('/', getExpenses); // GET /api/expenses - Get all expenses
router.get('/stats', getExpenseStats); // GET /api/expenses/stats - Get statistics
router.get('/:id', getExpenseById); // GET /api/expenses/:id - Get expense by ID
router.post('/', addExpense); // POST /api/expenses - Create new expense
router.put('/:id', updateExpense); // PUT /api/expenses/:id - Update expense
router.delete('/:id', removeExpense); // DELETE /api/expenses/:id - Delete expense

export default router;

