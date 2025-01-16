const express = require('express');
const User = require('../model/user.model');
const generateToken = require('../middleware/generateToken');
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');
const router = express.Router();

//register a new user
router.post("/register", registerUser);

//login a user
router.post("/login", loginUser);

//logout a user
router.post("/logout", logoutUser);

//get all register users
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
