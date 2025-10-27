import {Request, Response} from 'express';

import {authService} from '../service/auth.service';

const serviceInstance = new authService();
export class controller {
    register(req: Request, res: Response) {
        res.render('client/pages/auth/register', {
            titlePage: 'Trang đăng kí',
        });
    }

    async registerPost(req: Request, res: Response) {
        try {
            const { fullName, email, password } = req.body;
            const newUser = await serviceInstance.register(fullName, email, password);
            if (!newUser) {
                req.flash('error', 'Email đã tồn tại, vui lòng tạo bằng email mới!');
                return res.redirect(`/auth/register`);
            }

            req.flash('success', 'Đăng kí thành công, Vui lòng đăng nhập!');
            res.redirect('/auth/login');
        } catch (err) {
            req.flash('error', 'Lỗi server!');
        }
    }

    login(req: Request, res: Response) {
        res.render('admin/pages/auth/login', {
            titlePage: 'Trang đăng nhập',
        });
    }

    debug(req: Request, res: Response) {
        res.status(200).json({
            info: req.session,
            user: req.user,
        })
    }

    logout(req: Request, res: Response) {
        req.logout((err) => {
            if (err) return req.flash('error', 'Lỗi xung đột, xin hãy thử lại!');
            res.redirect('/auth/login');
        });
    }
}