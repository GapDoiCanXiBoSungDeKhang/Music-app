import express, { Application } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import routeClient from './client/route/index.route';
import { connect } from './config/database';

// Database
connect(process.env.DATABASE_URL);


// Initialize Express
const app: Application = express();
const port = process.env.PORT;

// Routes
routeClient(app);

// views
app.set('views', `${__dirname}/views`);
app.set('views engine', 'pug');

// static file
app.use(express.static(`${__dirname}/public`))

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}... {link: http://localhost:${port}}`);
});
