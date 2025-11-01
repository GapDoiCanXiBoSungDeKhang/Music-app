import {Router} from 'express';

const router = Router();

import {controller} from '../controller/profile.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.profile);

router.get('/debug', controllerInstance.debug)

export default router;