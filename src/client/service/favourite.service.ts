import {SongModel} from '../../model/song.model';
import '../../model/singer.model';
import { IUser } from "../../model/user.model";

export class favouriteService {
    async favourite(user: IUser) {
        try {
            const filter = {
                _id: user.listFavoritesSong['listId'],
                deleted: false,
                status: 'active',
            };
            const songs = await SongModel.find(filter)
                .select('title avatar singerId slug createdAt')
                .populate('singerId', 'fullName')
                .exec();

            return songs;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}