import {Router} from 'express';

const router = Router();

// controller
import {controller} from '../controller/song.controller'
const controllerInstance = new controller();

// validate
import {updatedLikeSongUser} from '../../../common/validate/songView.validate';

router.get('/:slug', controllerInstance.index);

router.get('/detail/:slug', updatedLikeSongUser, controllerInstance.detail);

router.patch('/like/:type_like/:id', updatedLikeSongUser, controllerInstance.updatedLike);

router.patch('/favourite/:type_fav/:id', updatedLikeSongUser, controllerInstance.updatedFav);

router.get('/search/:type', controllerInstance.search);

export default router;