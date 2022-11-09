// Main Backend File
// TODO: Consistency across ES6 and CommonJS import syntax

import {DatabaseConnector} from './database_connector';
import * as dotenv from 'dotenv'
const cors = require('cors');
const express = require('express');

dotenv.config();
const port = process.env.PORT || 3001;

// Connect to the database
let db_con = new DatabaseConnector();

console.log("client: ", db_con);

db_con.connect().then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.log('Error connecting to database: ' + err);
});

// Create the express app
const app = express();

// Use json
app.use(express.json());

// Set and use the cors library
app.use(cors());

// check if we're connected to the database

// Set routes
app.use('/register', require('./routes/api/register'));
app.use('/login', require('./routes/api/login'));
app.use('/account', require('./routes/api/account'));

// Start the express app
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});