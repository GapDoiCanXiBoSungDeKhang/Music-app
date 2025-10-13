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

    logout(req: Request, res: Response) {
        req.logout((err) => {
            if (err) return req.flash('error', 'Lỗi xung đột, xin hãy thử lại!');
            res.redirect('/auth/login');
        })
    }
}