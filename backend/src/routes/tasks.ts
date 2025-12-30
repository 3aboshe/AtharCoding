import { Router } from 'express';
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    togglePublish
} from '../controllers/taskController';
import { protect, adminOnly } from '../middleware';

const router = Router();

// Public routes
router.get('/level/:levelId', getTasks);
router.get('/:id', getTask);

// Admin routes
router.post('/', protect, adminOnly, createTask);
router.put('/:id', protect, adminOnly, updateTask);
router.delete('/:id', protect, adminOnly, deleteTask);
router.put('/:id/publish', protect, adminOnly, togglePublish);

export default router;
