import { Router, Request, Response } from 'express';

const router = Router();

// controller
import { controller } from '../controller/topic.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index)

export default router;