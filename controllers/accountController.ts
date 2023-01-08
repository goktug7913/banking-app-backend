const masterAccount = require('../model/MasterAccount');
const cryptoAccount = require('../model/CryptoAccount');

// TODO: If reverting to reduce nesting, password hashing implementation
// TODO: When deleting fiat and crypto accounts, check if the account has no balance and delete the associated transactions too.

export {} // To fix the error: Cannot redeclare block-scoped variable 'masterAccount'.

// Returns the account data for the given account ID
const handleGetAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;
    console.log("Getting account: " + accountData);
    // Check if the account exists
    const account = await masterAccount.findOne(accountData.account_id);
    // Send the account data
    res.status(200).send(account);
}

const handleGetFiatAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, get the fiat account
    if (accountExists) {
        // Check the ID of the fiat account to get
        const fiatAccountID = req.body.fiatAccountID;
        // Check if the account exists
        if (!accountData.fiatAccounts.findOne(fiatAccountID)) {
            // The account does not exist, so send an error
            res.status(400).send("The account does not exist.");
        }
        else {
            // The account exists, so get it
            const account = await masterAccount.getFiatAccount(accountData, fiatAccountID);
            // Send the account data
            res.status(200).send(account);
        }
    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
    }
}

const handleGetCryptoAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, get the crypto account
    if (accountExists) {
        // Check the ID of the crypto account to get
        const cryptoAccountID = req.body.cryptoAccountID;
        // Check if the account exists
        if (!accountData.cryptoAccounts.findOne(cryptoAccountID)) {
            // The account does not exist, so send an error
            res.status(400).send("The account does not exist.");
        }
        else {
            // The account exists, so get it
            const account = await masterAccount.getCryptoAccount(accountData, cryptoAccountID);
            // Send the account data
            res.status(200).send(account);
        }
    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
    }
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

const handleCreateFiatAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the account data from the request body
    const accountData = req.body;

    // Check if the account exists
    const accountExists = await masterAccount.exists(accountData);

    // If the account exists, create the fiat account
    if (accountExists) {
        // Check if the fiat account already exists
        if (accountData.fiatAccounts[req.body.fiatAccountID]) {
            // The fiat account already exists, so send an error
            res.status(400).send("The fiat account already exists.");
        }
        else {
            // The fiat account does not exist, so create it
            const account = await masterAccount.createFiatAccount(accountData, req.body.fiatAccountID);
            console.log("Fiat account created: " + req.body.fiatAccountID);
            // Send the account data
            res.status(200).send(account);
        }
    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
    }
}

const handleCreateCryptoAccount = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    console.log("Creating crypto account");
    // Check if the account exists
    const accountExists = await masterAccount.findById(req.body.master_id);

    // If the account exists, create the crypto account
    if (accountExists) {
        // The crypto account does not exist, so create it
        const account = {
            name: req.body.name,
            currency: req.body.currency,
        }

        // Create the crypto account
        const newaccount = await cryptoAccount.create(account);
        console.log("Crypto account created: " + newaccount);
        // Get the master account
        const master = await masterAccount.findById(req.body.master_id);
        // Add the crypto account to the master account
        console.log("master acc: "+master);
        master.crypto_accounts.push(newaccount._id);
        // Update the master account
        await masterAccount.updateOne(master);
        // Send the account data
        res.status(200);

    }
    else {
        // The account does not exist, so send an error
        res.status(400).send("The account does not exist.");
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
        await masterAccount.deleteOne(accountData);
        // Send success message
        res.status(200).send("Account deleted.");
    }
}

const getIdFromToken = async (req: { headers: { authorization: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
    console.log("Token in req header: "+token);
    // Get the ID from the token
    const id = await masterAccount.findOne({ token: token });
    console.log("ID from token: "+id);
    // Send the ID
    res.status(200).send(id);
}

module.exports = {
    handleGetAccount,
    handleUpdateAccount,
    handleGetFiatAccount,
    handleGetCryptoAccount,
    handleDeleteMasterAccount,
    handleDeleteFiatAccount,
    handleDeleteCryptoAccount,
    handleCreateFiatAccount,
    handleCreateCryptoAccount,
    testGetAllAccounts,
    getIdFromToken,
}


