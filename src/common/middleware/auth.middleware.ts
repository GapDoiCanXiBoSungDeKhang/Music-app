import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        const role = req.user['roleId'] ? 'manager' : 'user';
        res.locals[role] = req.user;
    }
    next();
};
