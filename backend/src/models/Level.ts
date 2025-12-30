import mongoose, { Document, Schema } from 'mongoose';

export interface ILevel extends Document {
    courseId: mongoose.Types.ObjectId;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    order: number;
    xp: number;
    checkpointProject?: {
        title: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
        requirements: string[];
        requirementsAr: string[];
    };
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const levelSchema = new Schema<ILevel>(
    {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        title: { type: String, required: true },
        titleAr: { type: String, required: true },
        description: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        icon: { type: String, default: '📖' },
        order: { type: Number, required: true },
        xp: { type: Number, default: 100 },
        checkpointProject: {
            title: String,
            titleAr: String,
            description: String,
            descriptionAr: String,
            requirements: [String],
            requirementsAr: [String],
        },
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Index for efficient queries
levelSchema.index({ courseId: 1, order: 1 });

export const Level = mongoose.model<ILevel>('Level', levelSchema);
export default Level;
