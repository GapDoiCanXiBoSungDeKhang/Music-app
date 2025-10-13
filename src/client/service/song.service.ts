import {SongModel} from '../model/song.model';
import {TopicModel} from '../model/topic.model';
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
}