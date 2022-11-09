const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');

// Register a new master account
router.post('/', registerController.handleRegister);

module.exports = router;
export {}; // This is a TS hack to get the file to compile, it's not needed in the actual code