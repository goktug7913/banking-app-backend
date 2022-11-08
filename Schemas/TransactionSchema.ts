import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export { transactionSchema };