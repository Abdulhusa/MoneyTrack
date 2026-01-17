import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Authentication Routes
 * POST /api/auth/signup - Register a new user
 * POST /api/auth/login - Login user
 * GET /api/auth/me - Get current user (protected)
 */
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;

