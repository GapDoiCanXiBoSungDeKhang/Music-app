import { Request, Response, NextFunction } from 'express';

import prefixNameConfig from '../config/prefixName.config';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Vui lòng đăng nhập');
        res.redirect(prefixNameConfig.PATH_ADMIN + '/auth/login');
    }
    res.locals.manager = req.user;
    next();
};
