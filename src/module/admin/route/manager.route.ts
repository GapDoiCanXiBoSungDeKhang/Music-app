import {Router} from 'express';
import multer from 'multer';

const upload = multer();

const router = Router();

import {uploadSingle} from '../../../common/middleware/upload.middleware';

import {controller} from '../controller/manager.controller'
const controllerInstance = new controller();

router.get('/', controllerInstance.index);

router.get('/create', controllerInstance.create);

router.post('/create', upload.single('avatar'), uploadSingle, controllerInstance.createPost);

export default router;