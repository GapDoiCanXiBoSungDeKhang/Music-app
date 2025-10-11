import { Request, Response } from 'express';

export class controller {
    index(req: Request, res: Response) {
        res.send('user');
    }
}