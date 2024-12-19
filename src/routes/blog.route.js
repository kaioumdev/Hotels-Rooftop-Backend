const express = require('express');
const router = express.Router();

//create blog post
router.post("/create-post", async (req, res) => {
    try {
        console.log("Blog data from api", req.body)
    } catch (error) {
        console.error("Error creating post", error);
        res.status(500).send("Server Error");
    }
})


//get all blogs
router.get("/", async (req, res) => {
    res.send("Blog Routes running...");
})

module.exports = router;


