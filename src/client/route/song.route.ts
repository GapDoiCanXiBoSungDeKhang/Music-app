import { Router, Request, Response } from 'express';

const router = Router();

// controller
import { controller } from '../controller/song.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index)

export default router;