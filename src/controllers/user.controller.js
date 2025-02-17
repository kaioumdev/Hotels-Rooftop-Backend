const User = require("../model/user.model");
const generateToken = require("../middleware/generateToken");

const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });
        await user.save();
        res.status(201).send({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Failed to register user", error);
        res.status(500).send({ message: "Registration failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        }

        // ✅ Generate JWT Token
        const token = await generateToken(user._id);

        // ✅ Set Cookie with Proper Configurations
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // ✅ Only works on HTTPS
            sameSite: "None", // ✅ Required for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day expiry
        });

        res.status(200).send({
            message: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Failed to login user", error);
        res.status(500).send({ message: "Login failed" });
    }
};

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        res.status(200).send({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Failed to log out user", error);
        res.status(500).send({ message: "Logout failed" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'id email role');
        res.status(200).send({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error("Failed to get users", error);
        res.status(500).send({ message: "Failed to get users" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id); // Debugging
        if (!id) {
            return res.status(400).send({ message: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Failed to delete user:", error);
        res.status(500).send({ message: "Failed to delete user" });
    }
};


const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User role updated successfully", user });
    } catch (error) {
        console.error("Failed to update user role", error);
        res.status(500).send({ message: "Failed to update user role" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getAllUsers, deleteUser, updateUserRole };
