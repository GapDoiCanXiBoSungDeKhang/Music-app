import {Request, Response} from 'express';

import {RoleModel} from '../../../common/model/role.model';

import {roleService} from '../service/role.service';
const serviceInstance = new roleService();

export class controller {
    async index(req: Request, res: Response) {
        const roles = await RoleModel.find({deleted: false, status: 'active'});
        res.render('admin/pages/role/list', {
            titlePage: 'Trang chức vụ',
            roles
        })
    }

    create(req: Request, res: Response) {
        res.render('admin/pages/role/create', {
            titlePage: 'Trang tạo mới chức vự',
        });
    }

    async createPost(req: Request, res: Response) {
        try {
            await serviceInstance.create(req.body);
            req.flash('success', 'Tạo chức quyền thành công!');
        } catch (e) {
            req.flash('error', 'Lỗi tạo vai trò');
        }
        res.redirect(req.get('Referrer') || '/');
    }
}