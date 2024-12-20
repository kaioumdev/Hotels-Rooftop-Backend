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
    try {
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
    } catch (error) {
        console.error("Error getting all post", error);
        res.status(500).send("Error getting all post");
    }
});

//get single blog post by id
router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.send({ message: "Got single blog post", post: post })
    } catch (error) {
        console.error("Error facing single post", error);
        res.status(500).send("Error facing single post");
    }
})


//update blog post by id
router.patch("/update-post/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, { ...req.body }, { new: true });
        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.send({ message: "Updated post successfully", post: updatedPost })
    } catch (error) {
        console.error("Error updating post", error);
        res.status(500).send("Error updating post");
    }
})

module.exports = router;



