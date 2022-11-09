import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose';

dotenv.config();

const uri:string = process.env.DB_URI as string;
const dbName:string = process.env.DB_NAME as string;

// TODO: Replace the mongodb driver implementation with mongoose

export class DatabaseConnector {
  async connect() {
    await mongoose.connect(uri);
    
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async retrieveCollections() {
    return mongoose.connection.collections;
  }
}