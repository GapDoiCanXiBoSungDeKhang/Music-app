import {Schema, Document, model} from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    password: string;
    email: string;
    avatar?: string;
    listLikesSong: Schema.Types.ObjectId;
    listFavoritesSong: Schema.Types.ObjectId;
    listViewsSong: Schema.Types.ObjectId;
    status?: 'active' | 'inactive';
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String },
        listLikesSong: { type: Schema.Types.ObjectId, ref: 'SongLike' },
        listFavoritesSong: { type: Schema.Types.ObjectId, ref: 'SongFavourite' },
        listViewsSong: { type: Schema.Types.ObjectId, ref: 'SongView' },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema, 'users');
