import { Request, Response } from 'express';

import { songService } from '../service/song.service';
const serviceInstance = new songService();

export class controller {
    async index(req: Request, res: Response) {
        res.render('client/pages/songs/list', {
            titlePage: 'Danh sách bài hát',
            songs: await serviceInstance.getListSong(req.params.slug),
        });
    }
}