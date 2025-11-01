import slug from 'slug';

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

    async create(body): Promise<void> {
        const dataSong: Record<string, any> = {
            title: body.title,
            description: body.description || '',
            topicId: body.topicId,
            singerId: body.singerId,
            status: body.status,
            avatar: body.avatar ? body.avatar[0] : '',
            audio: body.audio ? body.audio[0] : '',
            slug: slug(body.title),
        }
        const newDataSong = new SongModel(dataSong);
        await newDataSong.save();
    }
}