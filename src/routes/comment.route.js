const express = require('express');
const Comment = require('../model/comment.model');
const router = express.Router();

//create a comment
router.post("/post-comment", async (req, res) => {
    try {
        console.log(req.body);
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({ message: "Comment created successfully", comment: newComment })
    } catch (error) {
        console.error("an error occurred while creating new comment", error);
        res.status(500).send({ message: "Failed to create comment" })
    }
});

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
