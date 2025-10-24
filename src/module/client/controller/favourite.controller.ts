import {Request, Response} from 'express';

import {IUser} from '../../../common/model/user.model';

import {favouriteService} from '../service/favourite.service'
const favouriteInstance = new favouriteService();

export class controller {
    async index(req: Request, res: Response) {
        const user = req.user as IUser;
        const songs = await favouriteInstance.favourite(user);
        res.render('client/pages/favourite/favourite', {
            titlePage: 'Bài hát yêu thích',
            songs,
        })
    }
}