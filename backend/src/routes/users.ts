import { Router } from 'express';
import {
    getUsers,
    getUser,
    updateUserRole,
    deleteUser,
    getUserStats
} from '../controllers/userController';
import { protect, adminOnly } from '../middleware';

const router = Router();

// All routes require admin
router.use(protect, adminOnly);

router.get('/stats', getUserStats);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

export default router;
