import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the crypto account schema
const cryptoAccountSchema = new Schema({
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
    // The fiat account transactions
    // These are the IDs of the transactions, not the transactions themselves
    transactions: {
        type: Array,
        required: false,
    },
});

module.exports = mongoose.model("CryptoAccount", cryptoAccountSchema);