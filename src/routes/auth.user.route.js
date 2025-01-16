const express = require('express');
const User = require('../model/user.model');
const generateToken = require('../middleware/generateToken');
const { registerUser, loginUser, logoutUser, getAllUsers, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

//register a new user
router.post("/register", registerUser);

//login a user
router.post("/login", loginUser);

//logout a user
router.post("/logout", logoutUser);

//get all register users
router.get("/users", getAllUsers);

//delete user
router.delete("/users/:id", deleteUser);

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
