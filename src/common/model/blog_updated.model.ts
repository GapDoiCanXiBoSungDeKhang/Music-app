import { Schema, model } from 'mongoose';

const BlogUpdatedSchema = new Schema(
    {
        list_blog: [
            {
                managerId: { type: Schema.Types.ObjectId, ref: 'Manager', required: true },
                updatedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export const BlogUpdatedModel = model('BlogUpdated', BlogUpdatedSchema, 'blogsUpdated');
