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

    async createPost(req: Request, res: Response) {
        try {
            const data = await serviceInstance.create(req.body);
            if (data) {
                req.flash('error', data as string);
                return res.redirect(req.get('Referrer') || '/');
            }
            req.flash('success', 'Tạo tài khoản quản trị thành công');
        } catch (e) {
            req.flash('error', 'Lỗi tạo tài khoản quản trị');
        }
        res.redirect(req.get('Referrer') || '/');
    }
}