const express = require('express');
const User = require('../model/user.model');
const generateToken = require('../middleware/generateToken');
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
            return res.status(404).send({ message: "User not found" });
        };
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        };
        //generate token here
        const token = await generateToken(user._id);
        console.log(token);
        res.status(200).send({
            message: "User Login successfully", user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })

    } catch (error) {
        console.error("Failed to login user", error);
        res.status(500).send("login failed");
    }
})


module.exports = router;
