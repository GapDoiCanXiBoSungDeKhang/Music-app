import {Schema, model, Document} from 'mongoose';

export interface ISong extends Document {
    title: string;
    description?: string;
    avatar?: string;
    topicId?: Schema.Types.ObjectId;
    singerId?: Schema.Types.ObjectId;
    likes?: number;
    views?: number;
    lyrics?: string;
    audio?: string;
    status?: 'active' | 'inactive';
    deleted?: boolean;
    deletedAt?: Date;
    createdBy: {managerId: Schema.Types.ObjectId, at: Date};
    updatedBlogId?: Schema.Types.ObjectId;
    deletedBy: {managerId: Schema.Types.ObjectId, at: Date};
    slug: string;
}

const SongSchema = new Schema<ISong>({
    title: {
        type: String,
        required: true,
    },
    description: String,
    avatar: String,
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
    },
    singerId: {
        type: Schema.Types.ObjectId,
        ref: 'Singer',
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    lyrics: String,
    audio: String,
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
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    createdBy: {
        managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
        at: { type: Date, default: Date.now },
    },
    updatedBlogId: {type: Schema.Types.ObjectId, ref: 'BlogUpdated'},
    deletedBy: {
        managerId: {type: Schema.Types.ObjectId, ref: 'Manager'},
        at: { type: Date, default: Date.now },
    },
}, {
    timestamps: true
});

export const SongModel = model<ISong>('Song', SongSchema, 'songs');
