const express = require('express');
const User = require('../model/user.model');
const generateToken = require('../middleware/generateToken');
const { registerUser, loginUser, logoutUser, getAllUsers, deleteUser, updateUserRole } = require('../controllers/user.controller');
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
router.put("/users/:id", updateUserRole)


module.exports = router;
