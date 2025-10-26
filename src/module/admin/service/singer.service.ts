import {SingerModel} from '../../../common/model/singer.model';

import {ISinger} from '../../../common/model/singer.model';

export class singerService {
    async index(): Promise<ISinger[]> {
        const filter = {deleted: false, status: 'active'};
        const singers = await SingerModel.find(filter);
        return singers;
    }
}