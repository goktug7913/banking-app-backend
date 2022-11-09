const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
import { NextFunction, Request, Response } from 'express';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the header
    const token = req.header('auth-token');
    // If there is no token, return an error
    if (!token) {
        return res.status(401).send('Access denied!');
    }
    // Verify the token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // If the token is verified, continue
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token!');
    }
}

module.exports = verifyJWT;