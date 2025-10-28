import {Schema, model} from 'mongoose';

const BlogUpdatedSchema = new Schema(
    {
        list_blog: {
            type: [
                {
                    managerId: {type: Schema.Types.ObjectId, ref: 'Manager', required: true},
                    updatedAt: {type: Date, default: Date.now},
                },
            ],
            default: [],
        }
    },
    {
        timestamps: true
    }
);

export const BlogUpdatedModel = model('BlogUpdated', BlogUpdatedSchema, 'blogsUpdated');
