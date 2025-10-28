import {Request, Response} from 'express';

import {ManagerModel} from '../../../common/model/manager.model';

export class controller {
    async index(req: Request, res: Response) {
        const managers = await ManagerModel.find({deleted: false, status: 'active'});
        res.render('admin/pages/manager/list', {
            titlePage: 'Trang chức vụ',
            managers
        })
    }
}