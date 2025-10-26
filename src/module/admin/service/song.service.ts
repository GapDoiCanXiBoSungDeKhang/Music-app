import {SongModel} from '../../../common/model/song.model';

import {ISong} from '../../../common/model/song.model';

export class songService {
    async index() : Promise<ISong[]> {
        const filter = {status: 'active', deleted: false}
        const songs = await SongModel.find(filter)
            .populate('singerId', 'fullName')
            .populate('topicId', 'title')
            .exec();
        return songs;
    }
}