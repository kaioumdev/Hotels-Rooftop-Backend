const express = require('express');
const Comment = require('../model/comment.model');
const { createComment, getTotalComments } = require('../controllers/comment.controller');
const router = express.Router();

//create a comment
router.post("/post-comment", createComment);

//get all comments counts
router.get("/total-comments", getTotalComments)


module.exports = router;
