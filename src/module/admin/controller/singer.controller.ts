import {Request, Response} from 'express';

import {singerService} from '../service/singer.service';
const serviceInstance = new singerService();

export class controller {
    async index(req: Request, res: Response) {
        const singers = await serviceInstance.index();
        res.render('admin/pages/singer/list', { singers });
    }
}