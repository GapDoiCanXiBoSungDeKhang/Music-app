import {SongModel} from '../../../common/model/song.model';
import {TopicModel} from '../../../common/model/topic.model';

import '../../../common/model/singer.model';

import {ISong} from '../../../common/model/song.model';

export class songService {
    async index() : Promise<ISong[]> {
        const filter = {
            status: 'active',
            deleted: false,
        }
        const songs = await SongModel.find(filter)
            .populate('singerId', 'fullName')
            .exec();

        for (const song of songs) {
            const topic = await TopicModel.findOne({
                _id: song.topicId,
                status: 'active',
                deleted: false,
            })
                .select('title')
                .exec();

            song.topicId = topic.title;
        }
        return songs;
    }
}