import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    levelId: mongoose.Types.ObjectId;
    title: string;
    titleAr: string;
    // The main content - markdown with story, explanation, examples
    content: string;
    contentAr: string;
    // Task-specific fields
    description: string;
    descriptionAr: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    xp: number;
    order: number;
    starterCode: string;
    expectedOutput?: string;
    testCases: {
        input?: string;
        expectedOutput: string;
        description: string;
        descriptionAr: string;
    }[];
    hints: string[];
    hintsAr: string[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        levelId: { type: Schema.Types.ObjectId, ref: 'Level', required: true },
        title: { type: String, required: true },
        titleAr: { type: String, required: true },
        content: { type: String, default: '' }, // Markdown content with story, images, code
        contentAr: { type: String, default: '' },
        description: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        xp: { type: Number, default: 10 },
        order: { type: Number, required: true },
        starterCode: { type: String, default: '# Write your code here\n' },
        expectedOutput: String,
        testCases: [
            {
                input: String,
                expectedOutput: { type: String, required: true },
                description: { type: String, required: true },
                descriptionAr: { type: String, required: true },
            },
        ],
        hints: [String],
        hintsAr: [String],
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Index for efficient queries
taskSchema.index({ levelId: 1, order: 1 });

export const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
