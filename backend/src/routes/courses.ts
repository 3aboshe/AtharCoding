import { Router } from 'express';
import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    togglePublish
} from '../controllers/courseController';
import { protect, adminOnly } from '../middleware';

const router = Router();

// Public routes
router.get('/', getCourses);
router.get('/:slug', getCourse);

// Admin routes
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);
router.put('/:id/publish', protect, adminOnly, togglePublish);

export default router;
