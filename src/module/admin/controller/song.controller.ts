import {NextFunction, Request, Response} from 'express';

import {songService} from '../service/song.service';
const serviceInstance = new songService();

export class controller {
    async index(req: Request, res: Response) {
        const songs = await serviceInstance.index();
        res.render('admin/pages/songs/list', {
            titlePage: 'Quản lý bài hát',
            songs,
        });
    }
}