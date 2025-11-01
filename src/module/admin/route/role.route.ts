import {Router} from 'express';

const router = Router();

import {controller} from '../controller/role.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index);

router.get('/create', controllerInstance.create);

router.post('/create', controllerInstance.createPost);

export default router;