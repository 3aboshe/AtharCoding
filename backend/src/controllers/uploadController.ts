import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../middleware';

// @desc    Upload image
// @route   POST /api/upload
export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const fileUrl = `/uploads/${req.file.filename}`;

        res.json({
            url: fileUrl,
            filename: req.file.filename,
            originalName: req.file.originalname,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete image
// @route   DELETE /api/upload/:filename
export const deleteImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const filePath = path.join(__dirname, '../../uploads', req.params.filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ message: 'File deleted' });
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
