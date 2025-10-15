import {Schema} from 'mongoose';

import {SongModel} from '../model/song.model';
import {TopicModel} from '../model/topic.model';
import {SongLikeModel} from '../model/songLike.model';

import '../model/singer.model';

import {ISong} from '../model/song.model';

export class songService {
    async getListSong(slug: string): Promise<ISong[]> {
        try {
            const topic = await TopicModel.findOne({slug});
            if (!topic) return [];

            const songs = await SongModel.find({
                topicId: topic._id,
                deleted: false,
                status: 'active',
            })
                .populate('singerId', 'fullName')
                .exec();

            return songs;
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw new Error('Unable to fetch songs');
        }
    }

    async getOneSong(slug: string, req: any): Promise<ISong | null> {
        try {
            const song = await SongModel
                .findOne({slug: slug})
                .exec();
            if (!song) throw new Error('Song not found');

            // set views
            if (req.user) {
                song.views += 1;
                await song.save();
            }

            // get topic title
            const topic = await TopicModel
                .findOne({_id: song.topicId})
                .select('title')
                .exec();
            song.topicId = topic?.title || '';

            return song;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async updatedLike(typeLike: string, songId: string, songLikeId: Schema.Types.ObjectId): Promise<number> {
        try {
            const updatedSong = await SongModel.findByIdAndUpdate(
                songId,
                { $inc: { likes: typeLike === 'dislike' ? -1 : 1 } },
                { new: true }
            );
            if (!updatedSong) throw new Error('Song not found');
            const updateAction = typeLike === 'dislike' ? '$pull' : '$push';

            await SongLikeModel.findByIdAndUpdate(
                songLikeId,
                { [updateAction]: { listId: songId } },
            );

            return updatedSong.likes;
        } catch (err: any) {
            throw new Error(err.message || 'Error updating like');
        }
    }

}