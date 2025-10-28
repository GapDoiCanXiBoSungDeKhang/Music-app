import {Request, Response} from 'express';

import {RoleModel} from '../../../common/model/role.model';

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
}