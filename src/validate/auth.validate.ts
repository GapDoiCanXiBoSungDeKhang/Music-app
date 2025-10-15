import {Request, Response, NextFunction} from 'express';

import {isValidPassword} from '../shared/ulti/isPass.ulti'

export const registerValidate = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.fullName) {
        req.flash('error', 'Họ và tên rỗng!');
        return res.redirect('/auth/register');
    }
    if (!req.body.email) {
        req.flash('error', 'Email rỗng!');
        return res.redirect('/auth/register');
    }
    if (!req.body.password) {
        req.flash('error', 'Mật khẩu rỗng!');
        return res.redirect('/auth/register');
    }
    if (!isValidPassword(req.body.password)) {
        req.flash('error', 'Mật khẩu không hợp lệ!');
        return res.redirect('/auth/register');
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Mật khẩu xác thực không khớp!');
        return res.redirect('/auth/register');
    }
    next();
}

export const updatedLikeSongUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        req.flash('error', 'Đăng nhập tài khoản để tương tác bài hát!');
        return res.redirect(req.get('Referrer') || '/');
    }
    next();
}