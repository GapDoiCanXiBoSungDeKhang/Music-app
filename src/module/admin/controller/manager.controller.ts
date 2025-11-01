import {Request, Response} from 'express';

import {RoleModel} from '../../../common/model/role.model';

import {songService} from '../service/manager.service';
const serviceInstance = new songService();

export class controller {
    async index(req: Request, res: Response) {
        const managers = await serviceInstance.index();
        res.render('admin/pages/manager/list', {
            titlePage: 'Trang chức vụ',
            managers
        });
    }

    async create(req: Request, res: Response) {
        res.render('admin/pages/manager/create.pug', {
            titlePage: 'Trang tạo tài khoản quản lý',
            roles: await RoleModel.find({deleted: false, status: 'active'})
                .select('title')
                .exec()
        });
    }

    createPost(req: Request, res: Response) {
        res.json({
            data: req.body
        })
    }
}