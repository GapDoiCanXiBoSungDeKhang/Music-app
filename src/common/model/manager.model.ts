import {Schema, Document, model} from 'mongoose';

export interface IManager extends Document {
    fullName: string;
    password: string;
    phone: string;
    email: string;
    avatar?: string;
    roleId: Schema.Types.ObjectId;
    status?: 'active' | 'inactive';
    createdBy?: {
        managerId: Schema.Types.ObjectId;
        at: Date;
    };
    updatedBlogId?: Schema.Types.ObjectId;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ManagerSchema = new Schema<IManager>(
    {
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String },
        email: { type: String, required: true },
        avatar: { type: String },
        roleId: { type: Schema.Types.ObjectId, ref: 'Role'},
        createdBy: {
            managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
            at: { type: Date, default: Date.now },
        },
        updatedBlogId: {type: Schema.Types.ObjectId, ref: 'BlogUpdated'},
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const ManagerModel = model<IManager>('Manager', ManagerSchema, 'managers');
