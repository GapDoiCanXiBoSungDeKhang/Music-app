import express, {Application} from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import flash from 'express-flash';

// 🟢 Load environment variables
dotenv.config();

import routeClient from './module/client/route/index.route';
import routeServer from './module/admin/route/index.route';

import {connect} from './common/config/database.config';
import './common/config/passport.config';
import prefixNameConfig from './common/config/prefixName.config';

// 🟢 Database
connect(process.env.DATABASE_URL);

// 🟢 Initialize Express
const app: Application = express();
const port = process.env.PORT;

// 🟢 Session Passport
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    })
);
app.use(passport.initialize());
app.use(passport.session());

// 🟢 Set prefixName locals views
app.locals.prefixName = prefixNameConfig.PATH_ADMIN;

// 🟢 Flash
app.use(flash());

// 🟢 Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 🟢 View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// 🟢 Static files
app.use(express.static(path.join(__dirname, '../public')));

// 🟢 Routes
routeClient(app);
routeServer(app);

// 🟢 Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port} — link: http://localhost:${port}`);
});
