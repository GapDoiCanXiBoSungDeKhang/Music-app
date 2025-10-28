import {Request, Response} from 'express';

import {ManagerModel} from '../../../common/model/manager.model';

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

    create(req: Request, res: Response) {
        res.render('admin/pages/manager/create', {
            titlePage: 'Trang tạo tài khoản quản lý'
        });
    }
}