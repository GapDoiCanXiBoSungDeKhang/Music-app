import {Router} from 'express';

const router = Router();

// controller
import {controller} from '../controller/song.controller'
const controllerInstance = new controller();

// validate
import {updatedLikeSongUser} from '../../validate/songView.validate';

router.get('/:slug', controllerInstance.index);

export default router;