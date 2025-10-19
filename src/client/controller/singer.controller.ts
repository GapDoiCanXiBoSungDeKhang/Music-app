import {Request, Response} from 'express';

export class controller {
    async index(req: Request, res: Response) {
        res.json('singer')
    }
}