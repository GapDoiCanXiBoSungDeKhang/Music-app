import bcrypt from 'bcrypt';

import {UserModel} from '../../../common/model/user.model';
import {SongLikeModel} from '../../../common/model/songLike.model';
import {SongViewModel} from '../../../common/model/songView.model';
import {SongFavouriteModel} from '../../../common/model/songFavourite.model';

export class authService {
    async register(fullName: string, email: string, password: string) {
        const existingUser = await UserModel.findOne({ email, deleted: false });
        if (existingUser) return null;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newSongView, newSongFavourite, newSongLike] = await Promise.all([
            new SongViewModel().save(),
            new SongFavouriteModel().save(),
            new SongLikeModel().save(),
        ]);

        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
            listLikesSong: newSongLike._id,
            listFavoritesSong: newSongFavourite._id,
            listViewsSong: newSongView._id,
        });

        return newUser;
    }
}
