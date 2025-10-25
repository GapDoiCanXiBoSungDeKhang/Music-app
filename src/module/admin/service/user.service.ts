import {UserModel} from '../../../common/model/user.model';

import '../../../common/model/singer.model';

import {IUser} from '../../../common/model/user.model';

export class userService {
    async index() : Promise<IUser[]> {
        const filter = {
            status: 'active',
            deleted: false,
        }
        const user = await UserModel.find(filter)
            .exec();
        return user;
    }
}