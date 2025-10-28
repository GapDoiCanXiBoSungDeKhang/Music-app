import {ManagerModel} from '../../../common/model/manager.model';

import {IManager} from '../../../common/model/manager.model';

export class songService {
    async index() : Promise<IManager[]> {
        const filter = {status: 'active', deleted: false}
        const songs = await ManagerModel.find(filter).exec();
        return songs;
    }
}