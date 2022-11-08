import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the fiat account schema
const fiatAccountSchema = new mongoose.Schema({
    // The fiat account ID
    account_id: {
        type: String,
        required: true,
        unique: true,
    },
    // The fiat account name
    name: {
        type: String,
        required: true,
        maxlength: 64,
    },
    // The fiat account currency
    currency: {
        type: String,
        required: true,
        maxlength: 3,
    },
    // The fiat account balance
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    // The fiat account transactions
    // These are the IDs of the transactions, not the transactions themselves
    transactions: {
        type: Array,
        required: false,
    },
});

export { fiatAccountSchema };