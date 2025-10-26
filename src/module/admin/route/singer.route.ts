import {Router} from 'express';

const router = Router();

// controller
import {controller} from '../controller/singer.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index)

export default router;