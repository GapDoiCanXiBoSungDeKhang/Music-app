import {Request, Response} from 'express';

export class controller {
    profile(req: Request, res: Response) {
        res.render('admin/pages/profile/profile', {
            titlePage: 'Trang thông tin cá nhân',
            manager: req.user,
        });
    }

    debug(req: Request, res: Response) {
        res.status(200).json({
            data: req.user,
        })
    }
}