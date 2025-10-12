import { SongModel } from '../model/song.model';
import { TopicModel } from '../model/topic.model';

import { ISong } from '../model/song.model';

export class songService {
    async getListSong(slug: string): Promise<ISong[]> {
        try {
            const topic = await TopicModel.findOne({ slug });
            if (!topic) return [];

            const filter = {
                topicId: topic._id,
                deleted: false,
                status: 'active',
            };

            const songs = await SongModel.find(filter)
                .sort({ createdAt: -1 });

            return songs;
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw new Error('Unable to fetch songs');
        }
    }
}