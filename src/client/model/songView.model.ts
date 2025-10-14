import {Schema, Document, model} from 'mongoose';

export interface ISongView extends Document {
    listId: string[];
}

const songViewSchema: Schema = new Schema({
    listId: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
});

export const SongViewModel = model<ISongView>('SongView', songViewSchema, 'songsView');