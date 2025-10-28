import {Document, Schema, model} from 'mongoose';

export interface IRole extends Document {
    title: string;
    description?: string;
    permissions?: Schema.Types.ObjectId;
    status: 'active' | 'inactive';
    deleted: boolean;
    createdBy: {managerId: Schema.Types.ObjectId, at: Date};
    updatedBlogId?: Schema.Types.ObjectId;
    deletedBy: {managerId: Schema.Types.ObjectId, at: Date};
    createdAt: Date;
    updatedAt: Date;
}

const roleSchema = new Schema<IRole>({
    title: String,
    description: String,
    permissions: {type: Schema.Types.ObjectId, ref: 'Permission'},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'},
    deleted: {type: Boolean, default: false},
    createdBy: {
        managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
        at: { type: Date, default: Date.now },
    },
    updatedBlogId: {type: Schema.Types.ObjectId, ref: 'BlogUpdated'},
    deletedBy: {
        managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
        at: { type: Date, default: Date.now },
    }
}, {
    timestamps: true,
});

export const RoleModel =  model<IRole>('Role', roleSchema, 'roles');

