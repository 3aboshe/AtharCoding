import { Router } from 'express';
import {
    getLevels,
    getLevel,
    createLevel,
    updateLevel,
    deleteLevel,
    togglePublish
} from '../controllers/levelController';
import { protect, adminOnly } from '../middleware';

const router = Router();

// Public routes
router.get('/course/:courseId', getLevels);
router.get('/:id', getLevel);

// Admin routes
router.post('/', protect, adminOnly, createLevel);
router.put('/:id', protect, adminOnly, updateLevel);
router.delete('/:id', protect, adminOnly, deleteLevel);
router.put('/:id/publish', protect, adminOnly, togglePublish);

export default router;
