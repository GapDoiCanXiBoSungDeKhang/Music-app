import {Router} from 'express';

const router = Router();

import {controller} from '../controller/manager.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index);

router.get('/create', controllerInstance.create);

export default router;