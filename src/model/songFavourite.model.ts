import {Schema, Document, model} from 'mongoose';

export interface ISongFavourite extends Document {
    listId: string[];
}

const songFavouriteSchema: Schema = new Schema({
    listId: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
});

export const SongFavouriteModel = model<ISongFavourite>('SongFavourite', songFavouriteSchema, 'songsFavourite');