import mongoose from 'mongoose';
import {Request, Response} from 'express';

import {SongModel} from '../../../common/model/song.model';
import '../../../common/model/singer.model';

export class controller {
    async index(req: Request, res: Response) {
        const [songOriginal, song] = await Promise.all([
        SongModel.find({
            deleted: false,
            status: 'active',
        })
            .exec(),
        SongModel.find({
            deleted: false,
            singerId: new mongoose.Types.ObjectId("653b765c884a78f7ecf902ec"),
            status: 'active',
        })
            .exec()]);

        res.status(200).json({
            songId: song,
            song: songOriginal,
        });
    }
}