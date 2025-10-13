import {Application} from "express";

// route
import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './auth.route';
import singerRoute from './singer.route';

export default (app: Application) => {
    app.use('/topic', topicRoute);

    app.use('/song', songRoute);

    app.use('/singer', singerRoute);

    app.use('/auth', userRoute);
}