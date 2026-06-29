import {Request, Response} from 'express';

import {ProfileService} from "../service/profile.service";
const serviceInstance = new ProfileService();

export class controller {
    profile(req: Request, res: Response) {
        res.render('admin/pages/profile/profile', {
            titlePage: 'Trang thông tin cá nhân',
            manager: req.user,
        });
    }

    edit(req: Request, res: Response) {
        res.render('admin/pages/profile/edit', {
            titlePage: 'Trang chỉnh sửa thông tin cá nhân',
            manager: req.user,
        })
    }

    async editPatch(req: Request, res: Response) {
        const result = await serviceInstance.editPatch(req.body, req.user['_id']);
        if (!result) {
            req.flash('error', 'Lỗi cập nhật thông tin cá nhân!');
        } else {
            req.flash('success', 'Cập nhật thành công!');
        }
        res.redirect(req.get('Referrer') || '/');
    }

    changePassword(req: Request, res: Response) {
        res.render('admin/pages/profile/changePassword', {
            titlePage: 'Trang thay đổi mật khẩu',
            email: req.user['email'],
            fullName: req.user['fullName'],
        });
    }

    async encryptPassword(req: Request, res: Response) {
        const data = await serviceInstance.cypherPassword(
            req.body['password'],
            req.user['email']
        );
        req.session['text'] = data;
        req.session['path'] = 'change-password';
        res.redirect('/server/verification/otp');
    }

    debug(req: Request, res: Response) {
        res.status(200).json({
            data: req.user,
        })
    }
}