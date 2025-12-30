import { Router } from 'express';
import { register, login, getMe, updateProgress, refreshToken } from '../controllers/authController';
import { protect } from '../middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.put('/progress', protect, updateProgress);

export default router;
