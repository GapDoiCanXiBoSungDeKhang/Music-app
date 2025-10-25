import {Router} from 'express';
import multer from 'multer';

const router = Router();

const upload = multer();

// controller
import {controller} from '../controller/user.controller'
const controllerInstance = new controller();

// validate
import {updatedLikeSongUser} from '../../../common/validate/songView.validate';

// middleware
import {uploadSingle} from '../../../common/middleware/upload.middleware'

router.get('/', controllerInstance.index);

export default router;