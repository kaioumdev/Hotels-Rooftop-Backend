const express = require('express');
const Comment = require('../model/comment.model');
const { createComment } = require('../controllers/comment.controller');
const router = express.Router();

//create a comment
router.post("/post-comment", createComment);

//get all comments counts
router.get("/total-comments", async (req, res) => {
    try {
        const totalComments = await Comment.countDocuments({});
        res.status(200).send({ message: "Total comments count successfully", totalComments });
    } catch (error) {
        console.error("Failed to get comments counts", error)
        res.status(500).send({ message: "Failed to get comments counts" })
    }
})


module.exports = router;
