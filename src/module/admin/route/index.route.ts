import {Application, Response, Request} from "express";

// route
import dashboardsRoute from './dashboard.route';
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './user.route';
import permissionRoute from './permission.route';
import roleRoute from './role.route';
import singerRoute from './singer.route';
import authRoute from './auth.route';
import managerRoute from './manager.route';
import profileRoute from './profile.route';
import verificationRoute from './verification.route';
import generalSettingRoute from './setting.route'; 

// middleware
import {isAuthenticated} from '../../../common/middleware/authServer.middleware'
import {rateLimitAuthMiddleware} from "../../../common/middleware/rateLimitAuth.middleware";

// config
import prefixNameConfig from '../../../common/config/prefixName.config';

export default (app: Application) => {
    app.use(prefixNameConfig.PATH_ADMIN + '/dashboard', isAuthenticated, rateLimitAuthMiddleware, dashboardsRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/topic', isAuthenticated, rateLimitAuthMiddleware, topicRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/song', isAuthenticated, rateLimitAuthMiddleware,songRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/user', isAuthenticated, rateLimitAuthMiddleware, userRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/permission', isAuthenticated, rateLimitAuthMiddleware, permissionRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/singer', isAuthenticated, rateLimitAuthMiddleware, singerRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/role', isAuthenticated, rateLimitAuthMiddleware, roleRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/manager', isAuthenticated, rateLimitAuthMiddleware, managerRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/profile', isAuthenticated, rateLimitAuthMiddleware, profileRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/verification', isAuthenticated, rateLimitAuthMiddleware, verificationRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/setting', isAuthenticated, rateLimitAuthMiddleware, generalSettingRoute);

    app.use(prefixNameConfig.PATH_ADMIN + '/auth', rateLimitAuthMiddleware, authRoute);
}