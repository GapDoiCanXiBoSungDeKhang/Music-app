import {Schema, model, Document} from 'mongoose';

export interface ITopic extends Document {
    title: string;
    avatar?: string;
    description?: string;
    slug: string;
    status: 'active' | 'inactive';
    deleted: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const Topic = new Schema<ITopic>({
    title: {type: String, required: true},
    avatar: String,
    description: String,
    slug: {type: String, trim: true, unique: true, lowercase: true},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'},
    deleted: {type: Boolean, default: false},
    deletedAt: Date
}, {
    timestamps: true
});

export const TopicModel = model<ITopic>('Topic', Topic, 'topics');
