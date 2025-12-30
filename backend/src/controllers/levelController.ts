import { Response } from 'express';
import { Level, Task } from '../models';
import { AuthRequest } from '../middleware';

// @desc    Get all levels for a course
// @route   GET /api/levels/course/:courseId
export const getLevels = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = req.user?.role === 'admin';
        const query = {
            courseId: req.params.courseId,
            ...(isAdmin ? {} : { published: true })
        };

        const levels = await Level.find(query).sort({ order: 1 });
        res.json(levels);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single level with tasks
// @route   GET /api/levels/:id
export const getLevel = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const level = await Level.findById(req.params.id);

        if (!level) {
            res.status(404).json({ message: 'Level not found' });
            return;
        }

        const tasks = await Task.find({
            levelId: level._id,
            ...(req.user?.role !== 'admin' ? { published: true } : {})
        }).sort({ order: 1 });

        res.json({
            ...level.toObject(),
            tasks,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create level (Admin)
// @route   POST /api/levels
export const createLevel = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { courseId, title, titleAr, description, descriptionAr, icon, order, xp, checkpointProject } = req.body;

        const level = await Level.create({
            courseId,
            title,
            titleAr,
            description,
            descriptionAr,
            icon,
            order: order || 0,
            xp: xp || 100,
            checkpointProject,
        });

        res.status(201).json(level);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update level (Admin)
// @route   PUT /api/levels/:id
export const updateLevel = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const level = await Level.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!level) {
            res.status(404).json({ message: 'Level not found' });
            return;
        }

        res.json(level);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete level (Admin)
// @route   DELETE /api/levels/:id
export const deleteLevel = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const level = await Level.findById(req.params.id);

        if (!level) {
            res.status(404).json({ message: 'Level not found' });
            return;
        }

        // Delete all related tasks
        await Task.deleteMany({ levelId: level._id });
        await level.deleteOne();

        res.json({ message: 'Level deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Publish/Unpublish level (Admin)
// @route   PUT /api/levels/:id/publish
export const togglePublish = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const level = await Level.findById(req.params.id);

        if (!level) {
            res.status(404).json({ message: 'Level not found' });
            return;
        }

        level.published = !level.published;
        await level.save();

        res.json({ published: level.published });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
