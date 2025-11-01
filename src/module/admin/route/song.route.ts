import {Router} from 'express';
import multer from 'multer';

const router = Router();

const upload = multer();

// controller
import {controller} from '../controller/song.controller'
const controllerInstance = new controller();

// validate
import {updatedLikeSongUser} from '../../../common/validate/songView.validate';

// middleware
import {uploadFields} from '../../../common/middleware/upload.middleware'

router.get('/', controllerInstance.index);

router.get('/create', controllerInstance.create);

router.post(
    '/create',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]),
    uploadFields,
    controllerInstance.createPost
);

router.get('/edit/:id', controllerInstance.edit);

router.get('/detail/:id', controllerInstance.detail)

export default router;