import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './user.route';
import roleRoute from './role.route';
import singerRoute from './singer.route';
import authRoute from './auth.route';
import profileRoute from './profile.route';

// middleware
import {isAuthenticated} from '../../../common/middleware/auth.middleware';
import prefixNameConfig from '../../../common/config/prefixName.config';

export default (app: Application) => {
    app.use(prefixNameConfig.PATH_ADMIN + '/topic', topicRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/song', songRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/user', userRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/permission', roleRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/singer', singerRoute);

    // app.use(prefixNameConfig.PATH_ADMIN + '/profile', profileRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/auth', authRoute);
}