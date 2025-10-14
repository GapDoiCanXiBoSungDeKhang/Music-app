import {Schema, Document, model} from 'mongoose';

export interface ISongLike extends Document {
    listId: string[];
}

const songLikeSchema: Schema = new Schema({
    listId: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
});

export const SongLikeModel = model<ISongLike>('SongLike', songLikeSchema, 'songsLike');