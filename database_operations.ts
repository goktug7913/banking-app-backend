import {masterAccountSchema, fiatAccountSchema, cryptoAccountSchema, transactionSchema} from "./schemas";
import * as mongoose from 'mongoose';
import {DatabaseConnector} from "./database_connector";

// CRUD operations
export class DatabaseOperations {
    // Development test functions
    public async test_getAllMasterAccounts() {
        let db_con = new DatabaseConnector();
        await db_con.connect();
        let masterAccountModel = db_con.getMasterAccountModel();
        let masterAccounts = await masterAccountModel.find({});
        return masterAccounts;
    }
}