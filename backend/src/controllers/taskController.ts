import { Response } from 'express';
import { Task } from '../models';
import { AuthRequest } from '../middleware';

// @desc    Get all tasks for a level
// @route   GET /api/tasks/level/:levelId
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = req.user?.role === 'admin';
        const query = {
            levelId: req.params.levelId,
            ...(isAdmin ? {} : { published: true })
        };

        const tasks = await Task.find(query).sort({ order: 1 });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single task with full content
// @route   GET /api/tasks/:id
export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create task (Admin)
// @route   POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {
            levelId,
            title,
            titleAr,
            content,
            contentAr,
            description,
            descriptionAr,
            difficulty,
            xp,
            order,
            starterCode,
            expectedOutput,
            testCases,
            hints,
            hintsAr
        } = req.body;

        const task = await Task.create({
            levelId,
            title,
            titleAr,
            content: content || '',
            contentAr: contentAr || '',
            description,
            descriptionAr,
            difficulty: difficulty || 'beginner',
            xp: xp || 10,
            order: order || 0,
            starterCode: starterCode || '# Write your code here\n',
            expectedOutput,
            testCases: testCases || [],
            hints: hints || [],
            hintsAr: hintsAr || [],
        });

        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task (Admin)
// @route   PUT /api/tasks/:id
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task (Admin)
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Publish/Unpublish task (Admin)
// @route   PUT /api/tasks/:id/publish
export const togglePublish = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        task.published = !task.published;
        await task.save();

        res.json({ published: task.published });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
