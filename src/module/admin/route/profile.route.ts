import {Router} from 'express';

const router = Router();

import {controller} from '../controller/profile.controller'

const controllerInstance = new controller();

router.get('/', controllerInstance.profile)

export default router;