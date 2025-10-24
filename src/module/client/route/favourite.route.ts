import {Router} from 'express';

const router = Router();

import {controller} from '../controller/favourite.controller';
const controllerInstance = new controller();

import {updatedLikeSongUser} from '../../../common/validate/songView.validate';

router.get('/', updatedLikeSongUser, controllerInstance.index);

export default router;
