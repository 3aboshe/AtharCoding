import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    image?: string;
    slug: string;
    order: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        titleAr: { type: String, required: true },
        description: { type: String, required: true },
        descriptionAr: { type: String, required: true },
        icon: { type: String, default: '📚' },
        image: String,
        slug: { type: String, required: true, unique: true },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;
