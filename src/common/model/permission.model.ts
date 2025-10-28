import {Document, Schema, model} from 'mongoose';

export interface IPermission extends Document {
    listPermission: string[];
}

const permissionSchema = new Schema<IPermission>({
    listPermission: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
});

export const PermissionModel =  model<IPermission>('Permission', permissionSchema, 'permissions');

