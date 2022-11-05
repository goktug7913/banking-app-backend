// Main Backend File

// Import the database connector
import {DatabaseConnector} from './database_connector';

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