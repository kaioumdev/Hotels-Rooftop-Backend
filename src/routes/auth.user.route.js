const express = require('express');
const User = require('../model/user.model');
const router = express.Router();

//register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });
        console.log(user);
    } catch (error) {
        console.error("Failed to register user", error);
        res.status(500).send("Registration failed");
    }
})


module.exports = router;
