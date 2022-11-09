const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

// Login to a master account
router.post('/', loginController.handleLogin);

module.exports = router;
export {}; // This is a TS hack to get the file to compile, it's not needed in the actual code