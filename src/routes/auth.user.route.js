const express = require('express');
const User = require('../model/user.model');
const router = express.Router();

//register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });
        await user.save();
        res.status(200).send({ message: "User registered successfully", user: user });
    } catch (error) {
        console.error("Failed to register user", error);
        res.status(500).send("Registration failed");
    }
});

//login a user
router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send("User not found");
        };
        const isMatch = await user.comparePassword(password);

    } catch (error) {
        console.error("Failed to login user", error);
        res.status(500).send("login failed");
    }
})


module.exports = router;
