import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './auth.route';
import singerRoute from './singer.route';
import profileRoute from './profile.route';
import favouriteRoute from './favourite.route';

// middleware
import {isAuthenticated} from '../../../common/middleware/auth.middleware';
import prefixNameConfig from '../../../common/config/prefixName.config';

export default (app: Application) => {
    app.use(prefixNameConfig.PATH_ADMIN + '/topic', isAuthenticated, topicRoute);

    app.use(prefixNameConfig.PATH_ADMIN +  '/song', isAuthenticated, songRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/singer', isAuthenticated, singerRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/profile', isAuthenticated, profileRoute);

    app.use('/auth', userRoute);
}