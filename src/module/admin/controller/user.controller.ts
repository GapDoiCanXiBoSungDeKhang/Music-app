import {Request, Response} from 'express';

import {userService} from '../service/user.service';
const serviceInstance = new userService();

export class controller {
    async index(req: Request, res: Response) {
        const users = await serviceInstance.index();
        res.render('admin/pages/user/list', {
            titlePage: 'Quản lý người dùng',
            users,
        });
    }
}