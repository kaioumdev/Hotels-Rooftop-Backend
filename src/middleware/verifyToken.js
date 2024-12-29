const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token2 = req.headers['authorization'];
        // const token = req.cookies.token;
        console.log(token2);
    } catch (error) {
        console.error("Error verifying token: " + error);
        res.status(500).send({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;