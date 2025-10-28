import express, {Application} from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import flash from 'express-flash';
import methodOverride from 'method-override';

// 🟢 Load environment variables
dotenv.config();

import routeClient from './module/client/route/index.route';
import routeServer from './module/admin/route/index.route';

// 🟢 config
import {connect} from './common/config/database.config'; // connect database

import './common/config/passport.server.config';
import './common/config/passport.client.config';
import './common/config/passport.config'; // connect passport

import prefixNameConfig from './common/config/prefixName.config'; // connect prefixName

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

// Set API_KEY_TINYMCE
app.locals.apiKeyTinymce = process.env.API_KEY_TINYMCE;

// 🟢 Flash
app.use(flash());

// 🟢 override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

// 🟢 Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 🟢 View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// 🟢 Static files
app.use(express.static(path.join(__dirname, '../public')));

// 🟢 Tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// 🟢 Routes
routeClient(app);
routeServer(app);

// 🟢 Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port} — link: http://localhost:${port}`);
});
