const express = require('express');
const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

//create a new blog post
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
    try {
        const newPost = new Blog({ ...req.body, author: req.userId });
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
        const posts = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 });
        res.send(posts);
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
        };
        //comment related to the post
        const comment = await Comment.find({ postId: postId }).populate('user', 'username email');
        res.send({ message: "Got single blog post", post: post })
    } catch (error) {
        console.error("Error facing single post", error);
        res.status(500).send("Error facing single post");
    }
})


//update blog post by id
router.patch("/update-post/:id", verifyToken, async (req, res) => {
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
});


//delete blog post by id
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        };
        //delete related comments
        await Comment.deleteMany({ postId: postId })
        res.send({ message: "Deleted post successfully", post: post })
    } catch (error) {
        console.error("Error delete post", error);
        res.status(500).send("Error delete post");
    }
});

//related posts
router.get("/related/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Please provide post id" });
        };
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        };
        const titleRegex = new RegExp(post.title.split(' ').join('|'), 'i');
        const relatedQuery = {
            _id: { $ne: id },
            title: titleRegex
        };
        const relatedPost = await Blog.find(relatedQuery);
        res.status(200).send({ message: "Fetched related posts", posts: relatedPost });
    } catch (error) {
        console.error("Error fetching related post", error);
        res.status(500).send("Error fetching related post");
    }
})

module.exports = router;



