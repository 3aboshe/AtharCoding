import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { AuthRequest } from '../middleware';

const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
        expiresIn: '7d',
    });
};

const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh-fallback', {
        expiresIn: '30d',
    });
};

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            email,
            password,
            name,
            role: 'user',
        });

        const token = generateToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            refreshToken,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Update last activity
        user.lastActivity = new Date();
        await user.save();

        const token = generateToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            totalXP: user.totalXP,
            streak: user.streak,
            completedTasks: user.completedTasks,
            completedLevels: user.completedLevels,
            token,
            refreshToken,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            totalXP: user.totalXP,
            streak: user.streak,
            completedTasks: user.completedTasks,
            completedLevels: user.completedLevels,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user progress
// @route   PUT /api/auth/progress
export const updateProgress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const { taskId, xp } = req.body;

        if (taskId && !user.completedTasks.includes(taskId)) {
            user.completedTasks.push(taskId);
            user.totalXP += xp || 0;
        }

        user.lastActivity = new Date();
        await user.save();

        res.json({
            completedTasks: user.completedTasks,
            totalXP: user.totalXP,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh
export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { refreshToken: token } = req.body;

        if (!token) {
            res.status(401).json({ message: 'No refresh token provided' });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET || 'refresh-fallback'
        ) as { id: string };

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        const newToken = generateToken(user._id as string);

        res.json({ token: newToken });
    } catch (error: any) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
