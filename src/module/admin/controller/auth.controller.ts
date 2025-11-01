import {Request, Response} from 'express';

import prefixNameConfig from "../../../common/config/prefixName.config";

import {authService} from '../service/auth.service';
const serviceInstance = new authService();


export class controller {
    login(req: Request, res: Response) {
        res.render('admin/pages/auth/login', {
            titlePage: 'Trang đăng nhập',
            message: 'Đăng nhập'
        });
    }

    logout(req: Request, res: Response) {
        req.logout((err) => {
            if (err) return req.flash('error', 'Lỗi xung đột, xin hãy thử lại!');
            res.redirect(prefixNameConfig.PATH_ADMIN + '/auth/login');
        });
    }
}