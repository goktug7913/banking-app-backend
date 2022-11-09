import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the master account schema
const masterAccountSchema = new Schema({
    // The master account ID, which is the same as the user ID
    account_id: {
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64,
    },
    // The master account name
    name: {
        type: String,
        required: true,
        maxlength: 64,
    },
    surname: {
        type: String,
        required: true,
        maxlength: 64,
    },
    // The master account email, can be used to log in as well
    email: {
        type: String,
        required: true,
        maxlength: 64,
    },
    // These are the IDs of the fiat accounts, not the fiat accounts themselves
    fiat_accounts: {
        type: Array,
        required: false,
    },
    // These are the IDs of the crypto accounts, not the crypto accounts themselves
    crypto_accounts: {
        type: Array,
        required: false,
    },
    // These are the IDs of the transactions, not the transactions themselves.
    transactions: {
        type: Array,
        required: false,
    },
});

module.exports = mongoose.model("MasterAccount", masterAccountSchema);