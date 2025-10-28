import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './user.route';
import permissionRoute from './permission.route';
import roleRoute from './role.route';
import singerRoute from './singer.route';
import authRoute from './auth.route';
import profileRoute from './profile.route';

// middleware
import {isAuthenticated} from '../../../common/middleware/authServer.middleware'

// config
import prefixNameConfig from '../../../common/config/prefixName.config';

export default (app: Application) => {
    app.use(prefixNameConfig.PATH_ADMIN + '/topic', topicRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/song', songRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/user', userRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/permission', permissionRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/singer', singerRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/role', roleRoute);

    // app.use(prefixNameConfig.PATH_ADMIN + '/profile', profileRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/auth', authRoute);
}