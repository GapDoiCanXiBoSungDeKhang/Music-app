import {Request, Response} from 'express';

import {songService} from '../service/song.service';

import {IUser} from '../../model/user.model'

const serviceInstance = new songService();

export class controller {
    async index(req: Request, res: Response) {
        const songs = await serviceInstance.getListSong(req.params.slug);
        res.render('client/pages/songs/list', {
            titlePage: 'Danh sách bài hát',
            songs
        });
    }

    async detail(req: Request, res: Response) {
        const {slug} = req.params;
        const user = req.user as IUser;
        const song = await serviceInstance.getOneSong(slug, user);
        res.render('client/pages/songs/detail', {
            titlePage: 'Chi tiết bài hát',
            song,
        });
    }

    async updatedLike(req: Request, res: Response): Promise<void> {
        const {type_like, id} = req.params;
        const user = req.user as IUser;
        const song = await serviceInstance.updatedLike(type_like, id, user.listLikesSong);
        res.status(200).json({
            likes: song
        });
    }

    async updatedFav(req: Request, res: Response): Promise<void> {
        const {type_fav, id} = req.params;
        const user = req.user as IUser;
        await serviceInstance.updatedFav(type_fav, id, user.listFavoritesSong);
        res.status(200).json({
            message: 'success'
        });
    }

    async search(req: Request, res: Response) {
        const songs = await serviceInstance.search(req.query.q as string);
        res.render('client/pages/songs/search', {
            titlePage: 'Trang tìm kiếm',
            keyword: req.query.q,
            songs
        })
    }
}