const express = require('express');
const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const { createPost, getAllPosts, getSinglePost, updatePost, deletePost, getRelatedPosts } = require('../controllers/blog.controller');
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
router.delete("/:id", verifyToken, deletePost);

//related posts
router.get("/related/:id", getRelatedPosts)

module.exports = router;



