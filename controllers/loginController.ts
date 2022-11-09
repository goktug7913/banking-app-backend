const masterAccount = require('../model/MasterAccount');
import { NextFunction, Request, Response } from 'express';

// TODO: If reverting to reduce nesting, password hashing implementation

// Create a new master account
const handleLogin = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the master account data
    const masterAccountData = req.body;
    // Check if the account exists in the database
    const masterAccountExists = await masterAccount.exists({account_id: masterAccountData.account_id});
    // If the master account exists, send a success message
    if (masterAccountExists) {
        // Check if the password is correct
        const masterAccountPassword = await masterAccount.findOne({account_id: masterAccountData.account_id});
        if (masterAccountPassword.password == masterAccountData.password) {
            res.status(200).send("Login successful!");
        }
        else {
            res.status(400).send("Incorrect password!");
        }
    }
    else {
        res.status(400).send("Master account login failed, account does not exist!");
    }
}

module.exports = {
    handleLogin
}