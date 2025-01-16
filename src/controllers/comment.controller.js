const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({ message: "Comment created successfully", comment: newComment })
    } catch (error) {
        console.error("an error occurred while creating new comment", error);
        res.status(500).send({ message: "Failed to create comment" })
    }
}

module.exports = { createComment };