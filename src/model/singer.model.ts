import {Schema, model, Document} from 'mongoose';

export interface ISinger extends Document {
    fullName: string;
    avatar?: string;
    slug: string;
    status?: 'active' | 'inactive';
    deleted?: boolean;
    deletedAt?: Date;
}

const SingerSchema = new Schema<ISinger>({
    fullName: {
        type: String,
        required: true,
    },
    avatar: String,
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});

export const SingerModel = model<ISinger>('Singer', SingerSchema, 'singers');
