import {Schema, Document, model} from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    password: string;
    email: string;
    avatar?: string;
    listLikesSong: string;
    listFavoritesSong: string;
    listViewsSong: boolean;
    status?: 'active' | 'inactive';
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        listLikesSong: String,
        listFavoritesSong: String,
        listViewsSong: String,
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model<IUser>('User', UserSchema, 'users');
