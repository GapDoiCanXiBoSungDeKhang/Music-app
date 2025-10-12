import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// 🟢 Load environment variables
dotenv.config();

import routeClient from './client/route/index.route';
import { connect } from './config/database';

// 🟢 Database
connect(process.env.DATABASE_URL);

// 🟢 Initialize Express
const app: Application = express();
const port = process.env.PORT || 3000;

// 🟢 parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// 🟢 View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// 🟢 Static files
app.use(express.static(path.join(__dirname, '../public')));

// 🟢 Routes
routeClient(app);

// 🟢 Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port} — link: http://localhost:${port}`);
});
