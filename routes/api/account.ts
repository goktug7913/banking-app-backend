const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController');

// Login to a master account
router.get('/', accountController.handleGetAccount);
router.get('/all-test', accountController.testGetAllAccounts);
router.delete('/', accountController.handleDeleteMasterAccount);
router.put('/', accountController.handleUpdateAccount);
router.delete('/fiat', accountController.handleDeleteFiatAccount);
router.delete('/crypto', accountController.handleDeleteCryptoAccount);

module.exports = router;
export {}; // This is a TS hack to get the file to compile, it's not needed in the actual code