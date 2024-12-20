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
    const { search, category, location } = req.query;
    let query = {};

    if (search) {
        query = {
            ...query,
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ]
        };
    }

    if (category) {
        query = { ...query, category: category };
    }

    if (location) {
        query = { ...query, location: location };
    }
    const post = await Blog.find(query).sort({ createdAt: -1 });
    res.send({ message: "Got all blog posts", posts: post })
})

module.exports = router;


