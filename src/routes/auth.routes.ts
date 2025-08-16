import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { catchAsync } from '../utils/catch-async.util';

const router = Router();

router.post('/signup', catchAsync(authController.signup));

export default router;
