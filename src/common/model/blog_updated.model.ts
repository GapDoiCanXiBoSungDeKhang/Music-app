import {Schema, Document, model} from 'mongoose';

const ListBlogSchema = new Schema(
    {
        list_blog: [
            {
                managerId: {type: Schema.Types.ObjectId, ref: 'Manager'},
                updatedAt: Date,
            }
        ],
    },
    { timestamps: true }
);

export const ListBlogModel = model('Manager', ListBlogSchema, 'managers');
