import { Response } from 'express';
import { Course, Level, Task } from '../models';
import { AuthRequest } from '../middleware';

// @desc    Get all courses
// @route   GET /api/courses
export const getCourses = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = req.user?.role === 'admin';
        const query = isAdmin ? {} : { published: true };

        const courses = await Course.find(query).sort({ order: 1 });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single course with levels and tasks
// @route   GET /api/courses/:slug
export const getCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        const levels = await Level.find({
            courseId: course._id,
            ...(req.user?.role !== 'admin' ? { published: true } : {})
        }).sort({ order: 1 });

        const levelsWithTasks = await Promise.all(
            levels.map(async (level) => {
                const tasks = await Task.find({
                    levelId: level._id,
                    ...(req.user?.role !== 'admin' ? { published: true } : {})
                }).sort({ order: 1 });

                return {
                    ...level.toObject(),
                    tasks,
                };
            })
        );

        res.json({
            ...course.toObject(),
            levels: levelsWithTasks,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create course (Admin)
// @route   POST /api/courses
export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, titleAr, description, descriptionAr, icon, image, slug, order } = req.body;

        const courseExists = await Course.findOne({ slug });
        if (courseExists) {
            res.status(400).json({ message: 'Course with this slug already exists' });
            return;
        }

        const course = await Course.create({
            title,
            titleAr,
            description,
            descriptionAr,
            icon,
            image,
            slug,
            order: order || 0,
        });

        res.status(201).json(course);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update course (Admin)
// @route   PUT /api/courses/:id
export const updateCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        res.json(course);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete course (Admin)
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        // Delete all related levels and tasks
        const levels = await Level.find({ courseId: course._id });
        for (const level of levels) {
            await Task.deleteMany({ levelId: level._id });
        }
        await Level.deleteMany({ courseId: course._id });
        await course.deleteOne();

        res.json({ message: 'Course deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Publish/Unpublish course (Admin)
// @route   PUT /api/courses/:id/publish
export const togglePublish = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        course.published = !course.published;
        await course.save();

        res.json({ published: course.published });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
