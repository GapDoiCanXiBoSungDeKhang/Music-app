import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './auth.route';
import singerRoute from './singer.route';
import profileRoute from './profile.route';

// middleware
import {isAuthenticated} from '../../middleware/auth.middleware'

export default (app: Application) => {
    app.use('/topic', isAuthenticated, topicRoute);

    app.use('/song', isAuthenticated, songRoute);

    app.use('/singer', isAuthenticated, singerRoute);

    app.use('/profile', isAuthenticated, profileRoute);

    app.use('/auth', userRoute);
}