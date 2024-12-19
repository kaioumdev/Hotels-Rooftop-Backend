const express = require('express');
const Blog = require('../model/blog.model');
const router = express.Router();

//create blog post
router.post("/create-post", async (req, res) => {
    try {
        const newPost = new Blog({ ...req.body });
        await newPost.save();
        res.status(201).send({ message: "New post created successfully", post: newPost })
    } catch (error) {
        console.error("Error creating post", error);
        res.status(500).send("Server Error");
    }
})


//get all blogs
router.get("/", async (req, res) => {
    const post = await Blog.find();
    res.send({ message: "Got all blog posts", posts: post })
})

module.exports = router;


