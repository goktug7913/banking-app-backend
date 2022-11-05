import {MongoClient, MongoClientOptions, ServerApiVersion} from 'mongodb';
import * as dotenv from 'dotenv'

dotenv.config();

const uri:string = process.env.DB_URI as string;
const dbName:string = process.env.DB_NAME as string;

// TODO: Replace the mongodb driver implementation with mongoose

export class DatabaseConnector {
  private static client: MongoClient;

  private static options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
    },
  };

  async connect() {
    DatabaseConnector.client = new MongoClient(uri, DatabaseConnector.options);
    await DatabaseConnector.client.connect();
  }

  async disconnect() {
    await DatabaseConnector.client.close();
  }

  async retrieveCollections() {
    let collections = await DatabaseConnector.client.db(dbName).listCollections().toArray();
    return collections;
  }

  async initializeDatabase() {
    // Let's check if the required collections exist
    let collections = await this.retrieveCollections();
    let collectionNames = collections.map((collection) => collection.name);
    console.log("Checking for required collections...");
    // If the collections don't exist, create them
    if (!collectionNames.includes('master_accounts')) {
      await DatabaseConnector.client.db(dbName).createCollection('master_accounts');
      console.log('Created master_accounts collection');
    }
    if (!collectionNames.includes('fiat_accounts')) {
      await DatabaseConnector.client.db(dbName).createCollection('fiat_accounts');
        console.log('Created fiat_accounts collection');
    }
    if (!collectionNames.includes('crypto_accounts')) {
        await DatabaseConnector.client.db(dbName).createCollection('crypto_accounts');
        console.log('Created crypto_accounts collection');
    }
    if (!collectionNames.includes('transactions')) {
        await DatabaseConnector.client.db(dbName).createCollection('transactions');
        console.log('Created transactions collection');
    }
    console.log("Done checking collections!");
  }
}
