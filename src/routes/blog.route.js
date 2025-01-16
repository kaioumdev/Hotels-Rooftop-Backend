const express = require('express');
const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const { createPost, getAllPosts, getSinglePost, updatePost } = require('../controllers/blog.controller');
const router = express.Router();

//create a new blog post
router.post("/create-post", verifyToken, isAdmin, createPost)


//get all blogs
router.get("/", getAllPosts);

//get single blog post by id
router.get("/:id", getSinglePost)


//update blog post by id
router.patch("/update-post/:id", verifyToken, updatePost);


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
        res.status(200).send(relatedPost);
    } catch (error) {
        console.error("Error fetching related post", error);
        res.status(500).send("Error fetching related post");
    }
})

module.exports = router;



