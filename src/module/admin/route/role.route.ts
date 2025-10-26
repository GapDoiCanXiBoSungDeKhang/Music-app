import {Router} from 'express';

const router = Router();

import {controller} from '../controller/role.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index)

router.patch('/update', controllerInstance.update);

export default router;