import {Router} from 'express';
import passport from 'passport';

const router = Router();

// controller
import {controller} from '../controller/auth.controller';

// validate
import {registerValidate} from '../../../common/validate/auth.validate'

const controllerInstance = new controller();

router.get('/register', controllerInstance.register);

router.post('/register', registerValidate, controllerInstance.registerPost);

router.get('/login', controllerInstance.login);

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/topic',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })
);

router.get('/debug', controllerInstance.debug);

router.get('/logout', controllerInstance.logout);

export default router;