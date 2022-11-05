// Main Backend File

import {DatabaseConnector} from './database_connector';
import {masterAccountSchema, fiatAccountSchema, cryptoAccountSchema, transactionSchema} from './schemas';
import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
const cors = require('cors');
const express = require('express');

dotenv.config();
const port = process.env.PORT || 3000;

// Connect to the database
let db_con = new DatabaseConnector();

console.log("client: ", db_con);

db_con.connect().then(() => {
    console.log('Connected to database!');
    db_con.initializeDatabase().then(() => {
        console.log('Database initialized!');
    });

    db_con.retrieveCollections().then((collections) => {
        // Print the collection names
        console.log("Collections: ");
        for (let collection of collections) {
            console.log(collection.name);
        }
    });

}).catch((err) => {
    console.log('Error connecting to database: ' + err);
});

// Create the express app
const app = express();

// Use the cors library
app.use(cors());

// Create the master account route
app.get('/master_account', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Create the fiat account route
app.get('/fiat_account', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Create the crypto account route
app.get('/crypto_account', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Create the transaction route
app.get('/transaction', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the express app
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});