const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        };
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error("Error verifying token: " + error);
        res.status(500).send({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;