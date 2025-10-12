import { Router } from 'express';

const router = Router();

// controller
import { controller } from '../controller/user.controller'
const controllerInstance = new controller();

router.get('/register', controllerInstance.register);

router.get('/login', controllerInstance.login);

export default router;