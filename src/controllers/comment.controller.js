const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({ message: "Comment created successfully", comment: newComment })
    } catch (error) {
        console.error("an error occurred while creating new comment", error);
        res.status(500).send({ message: "Failed to create comment" })
    }
};

const getTotalComments = async (req, res) => {
    try {
        const totalComments = await Comment.countDocuments({});
        res.status(200).send({ message: "Total comments count successfully", totalComments });
    } catch (error) {
        console.error("Failed to get comments counts", error)
        res.status(500).send({ message: "Failed to get comments counts" })
    }
}

module.exports = { createComment, getTotalComments };