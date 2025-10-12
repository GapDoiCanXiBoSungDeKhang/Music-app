import { Request, Response } from 'express';

export class controller {
    register(req: Request, res: Response) {
        res.render('client/pages/auth/register', {
            titlePage: 'Trang đăng kí',
        });
    }

    login(req: Request, res: Response) {
        res.render('client/pages/auth/login', {
            titlePage: 'Trang đăng nhập',
        });
    }
}