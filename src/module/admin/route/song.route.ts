import {Router} from 'express';

const router = Router();

// controller
import {controller} from '../controller/song.controller'
const controllerInstance = new controller();

// validate
import {updatedLikeSongUser} from '../../../common/validate/songView.validate';

router.get('/', controllerInstance.index);

export default router;