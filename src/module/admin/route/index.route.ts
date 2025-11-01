import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './user.route';
import permissionRoute from './permission.route';
import roleRoute from './role.route';
import singerRoute from './singer.route';
import authRoute from './auth.route';
import managerRoute from './manager.route';
import profileRoute from './profile.route';

// middleware
import {isAuthenticated} from '../../../common/middleware/authServer.middleware'

// config
import prefixNameConfig from '../../../common/config/prefixName.config';

export default (app: Application) => {
    app.use(prefixNameConfig.PATH_ADMIN + '/topic', isAuthenticated, topicRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/song', isAuthenticated, songRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/user', isAuthenticated, userRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/permission', isAuthenticated, permissionRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/singer', isAuthenticated, singerRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/role', isAuthenticated, roleRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/manager', isAuthenticated, managerRoute);

    // app.use(prefixNameConfig.PATH_ADMIN + '/profile', profileRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/auth', authRoute);
}