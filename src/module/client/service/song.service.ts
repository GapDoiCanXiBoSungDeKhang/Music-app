import mongoose, {Schema} from 'mongoose';

import {SongModel} from '../../../common/model/song.model';
import {TopicModel} from '../../../common/model/topic.model';
import {SongLikeModel} from '../../../common/model/songLike.model';
import {SongViewModel} from '../../../common/model/songView.model';
import {SongFavouriteModel} from '../../../common/model/songFavourite.model';

import '../../../common/model/singer.model';

import {ISong} from '../../../common/model/song.model';
import {IUser} from '../../../common/model/user.model';

import {convertTextToSlug} from '../../../shared/ulti/unidecode.ulti';

export class songService {
    async getListSong(slug: string): Promise<ISong[]> {
        try {
            const topic = await TopicModel.findOne({slug});
            if (!topic) return [];

            const songs = await SongModel.find({
                topicId: new mongoose.Types.ObjectId(topic._id as string),
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

    async getOneSong(slug: string, user: IUser): Promise<ISong | null> {
        try {
            const song = await SongModel
                .findOne({slug: slug})
                .populate('singerId', 'fullName')
                .populate('topicId', 'title')
                .exec();
            if (!song) throw new Error('Song not found');

            // set views
            if (!user.listViewsSong["listId"].includes(song._id)) {
                song.views += 1; await song.save();
                await SongViewModel.findByIdAndUpdate(
                    user.listViewsSong,
                    { $push: { listId: song._id } }
                )
            }

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

    async updatedFav(typeFav: string, songId: string, songFavId: Schema.Types.ObjectId): Promise<void> {
        try {
            const updateAction = typeFav === 'disfav' ? '$pull' : '$push';
            await SongFavouriteModel.findByIdAndUpdate(
                songFavId,
                { [updateAction]: { listId: songId } },
            );
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async search(q: string) {
        try {
            let songs = [];
            const filter = {status: 'active', deleted: false};
            if (q) {
                const convertText = convertTextToSlug(q);
                filter['$or'] = [
                    { title: new RegExp(q, 'i') },
                    { slug: new RegExp(convertText, 'i') },
                ];
                songs = await SongModel.find(filter)
                    .populate('singerId', 'fullName')
                    .exec();
            }

            return songs;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}