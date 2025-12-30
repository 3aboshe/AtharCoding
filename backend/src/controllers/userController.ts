import { Response } from 'express';
import { User } from '../models';
import { AuthRequest } from '../middleware';

// @desc    Get all users (Admin)
// @route   GET /api/users
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single user (Admin)
// @route   GET /api/users/:id
export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role (Admin)
// @route   PUT /api/users/:id/role
export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            res.status(400).json({ message: 'Invalid role' });
            return;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await user.deleteOne();
        res.json({ message: 'User deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user stats (Admin)
// @route   GET /api/users/stats
export const getUserStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: 'admin' });
        const activeToday = await User.countDocuments({
            lastActivity: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });

        const topLearners = await User.find()
            .sort({ totalXP: -1 })
            .limit(10)
            .select('name email totalXP completedTasks streak');

        res.json({
            totalUsers,
            adminCount,
            activeToday,
            topLearners,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
