// Schemas for the database
//
// This file contains the schemas for the database
// The schemas are used to create the collections in the database
// The schemas are also used to validate the data that is being inserted into the database

// Import the mongoose library
import * as mongoose from 'mongoose';

// Define the master account schema
const masterAccountSchema = new mongoose.Schema({
    // The master account ID
    account_id: {
        type: String,
        required: true,
        unique: true,
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
    // The master account email
    email: {
        type: String,
        required: true,
        maxlength: 64,
    },
    fiat_accounts: {
        type: Array,
        required: false,
    },
    crypto_accounts: {
        type: Array,
        required: false,
    },
    transactions: {
        type: Array,
        required: false,
    },
});

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
    transactions: {
        type: Array,
        required: false,
    },
});

// Define the crypto account schema
const cryptoAccountSchema = new mongoose.Schema({
    // The crypto account ID
    account_id: {
        type: String,
        required: true,
        unique: true,
    },
    // The crypto account name
    name: {
        type: String,
        required: true,
        maxlength: 64,
    },
    // The crypto account currency
    currency: {
        type: String,
        required: true,
        maxlength: 4,
    },
    // The crypto account balance
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    // The crypto account transactions
    transactions: {
        type: Array,
        required: false,
    },
});

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    // The transaction ID
    transaction_id: {
        type: String,
        required: true,
        unique: true,
    },
    // The transaction type
    type: {
        type: String,
        required: true,
        maxlength: 64,
    },
    // The transaction amount
    amount: {
        type: Number,
        required: true,
    },
    // The transaction currency
    currency: {
        type: String,
        required: true,
        maxlength: 4,
    },
    // The transaction date
    date: {
        type: Date,
        required: true,
    },
    // The transaction description
    description: {
        type: String,
        required: false,
        maxlength: 256,
    },
    // The transaction source account
    source_account: {
        type: String,
        required: false,
        maxlength: 64,
    },
    // The transaction destination account
    destination_account: {
        type: String,
        required: false,
        maxlength: 64,
    },
});

export {masterAccountSchema, fiatAccountSchema, cryptoAccountSchema, transactionSchema};