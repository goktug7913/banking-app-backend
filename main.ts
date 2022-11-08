// Main Backend File

import {DatabaseConnector} from './database_connector';
import {masterAccountSchema, fiatAccountSchema, cryptoAccountSchema, transactionSchema} from './schemas';
import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import {DatabaseOperations} from "./database_operations";
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
app.get('/test/allAccounts', (req: Request, res: Response) => {
    console.log("Received request for all master accounts");
    dbOps.test_getAllMasterAccounts().then((masterAccounts) => {
        res.send(masterAccounts);
    });
});

app.post('/test/createMasterAccount', (req: Request, res: Response) => {
    console.log("Received request to create a master account");
});

// Start the express app
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

let dbOps = new DatabaseOperations();
console.log("dbOps: ", dbOps);