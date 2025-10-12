import { Router } from 'express';

const router = Router();

// controller
import { controller } from '../controller/song.controller'
const controllerInstance = new controller();

router.get('/:slug', controllerInstance.index)

router.get('/detail/:slug', controllerInstance.detail)

export default router;