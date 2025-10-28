import {Request, Response} from 'express';

import dataPermission from '../../../common/data/modules-permissions.data';
import dataRole from '../../../common/data/modules-roles.data';

export class controller {
    index(req: Request, res: Response) {
        res.render('admin/pages/permission/permission', {
            moduleList: dataPermission,
            roles: dataRole,
        });
    }

    update(req: Request, res: Response) {
        res.status(200).json(JSON.parse(req.body.permissions));
    }
}