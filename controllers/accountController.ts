const masterAccount = require('../model/MasterAccount');
import { NextFunction, Request, Response } from 'express';

// TODO: If reverting to reduce nesting, password hashing implementation
// TODO: When deleting fiat and crypto accounts, check if the account has no balance and delete the associated transactions too.

// Create a new master account
const handleGetAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;
    console.log("Getting account: " + accountData.account_id);
    // Check if the account exists
    const account = await masterAccount.findOne(accountData.account_id);
    console.log("Account found: " + accountData._id);
    await masterAccount.update(account,accountData)
    console.log("Account updated: " + accountData._id);
    console.log("New account data: " + account);
    // Send the account data
    res.status(200).send(account);
}

const handleUpdateAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    console.log("Updating account");
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, update it
    if (accountExists) {
        const account = await masterAccount.update(accountData);
        console.log("Account updated: " + accountData.account_id);
        // Send the account data
        res.status(200).send(account);
    }
}

const handleDeleteFiatAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, delete the fiat account
    if (accountExists) {
        // Check the ID of the crypto account to delete
        const fiatAccountID = req.body.fiatAccountID;
        // Check if the account exists
        if (!accountData.fiatAccounts.findOne(fiatAccountID)) {
            // The account does not exist, so send an error
            res.status(400).send("The account does not exist.");
        }
        // If the balance is 0, delete the account
        if (accountData.fiatAccounts[fiatAccountID].balance == 0) {
            const account = await masterAccount.deletefiatAccount(accountData, fiatAccountID);
            // Send the account data
            res.status(200).send(account);
        }
        else {
            // The balance is not 0, so send an error
            res.status(400).send("The balance of the account is not 0, so it cannot be deleted.");
        }
    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
    }
}

const handleDeleteCryptoAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, delete the crypto account
    if (accountExists) {
        // Check the ID of the crypto account to delete
        const cryptoAccountID = req.body.cryptoAccountID;
        // Check if the account exists
        if (!accountData.cryptoAccounts[cryptoAccountID]) {
            // The account does not exist, so send an error
            res.status(400).send("The account does not exist.");
        }
        // If the balance is 0, delete the account
        if (accountData.cryptoAccounts[cryptoAccountID].balance == 0) {
            const account = await masterAccount.deleteCryptoAccount(accountData, cryptoAccountID);
            // Send the account data
            res.status(200).send(account);
        }
        else {
            // The balance is not 0, so send an error
            res.status(400).send("The balance of the account is not 0, so it cannot be deleted.");
        }
    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
    }
}

const testGetAllAccounts = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    console.log("Getting all accounts");
    // Return all accounts
    const accounts = await masterAccount.find();
    // Send the account data
    res.status(200).send(accounts);
}

const handleDeleteMasterAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, delete it
    if (accountExists) {
        const account = await masterAccount.deleteOne(accountData);

        // Send success message
        res.status(200).send("Account deleted.");
    }
}

module.exports = {
    handleGetAccount,
    handleUpdateAccount,
    handleDeleteMasterAccount,
    handleDeleteFiatAccount,
    handleDeleteCryptoAccount,
    testGetAllAccounts,
}
