const masterAccount = require('../model/MasterAccount');
import { NextFunction, Request, Response } from 'express';

// TODO: Password hashing implementation

// Create a new master account
const handleRegister = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the master account data
    const masterAccountData = req.body;
    // Create a new master account
    try{
        await masterAccount.create(masterAccountData);
    }catch (err: any) {
        return res.status(500).send(err);
    }
    // Check if the new account exists in the database
    const masterAccountExists = await masterAccount.exists({account_id: masterAccountData.account_id});
    // If the master account exists, send a success message
    if (masterAccountExists) {
        res.status(200).send("Master account created successfully!");
    }
    else {
        res.status(400).send("Master account creation failed!");
    }
}

module.exports = {
    handleRegister
}