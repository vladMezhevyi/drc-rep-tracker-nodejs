import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { catchAsync } from '../utils/catch-async.util';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', catchAsync(authController.signup));
router.post('/login', catchAsync(authController.login));
router.post('/signout', authMiddleware, catchAsync(authController.signOut));
router.get('/refresh-token', authMiddleware, catchAsync(authController.refreshToken));

export default router;
