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
        res.cookie("token", token, {
            httpOnly: true, //enable this only when you have https:
            secure: true,
            sameSite: true
        })
        res.status(200).send({
            message: "User Login successfully", token, user: {
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
});

//logout a user
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).send({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Failed to log out user", error);
        res.status(500).send("logout failed");
    }
});

//get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, 'id email role');
        res.status(200).send({ message: "Users found successfully", users })
    } catch (error) {
        console.error("Failed to get users", error);
        res.status(500).send("Failed to get users");
    }
});

//delete user
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        };
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Failed to delete user", error);
        res.status(500).send("Failed to delete user");
    }
});

//update a role of user 
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        };
        res.status(200).send({ message: "User role updated successfully", user });
    } catch (error) {
        console.error("Failed to update user role", error);
        res.status(500).send("Failed to update user role");
    }
})


module.exports = router;
