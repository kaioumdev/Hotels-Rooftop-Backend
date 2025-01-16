const createPost = async (req, res) => {
    try {
        const newPost = new Blog({ ...req.body, author: req.userId });
        await newPost.save();
        res.status(201).send({ message: "New post created successfully", post: newPost })
    } catch (error) {
        console.error("Error creating post", error);
        res.status(500).send("Server Error");
    }
};

const getAllPosts = async (req, res) => {
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
};

const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        };
        //comment related to the post
        const comments = await Comment.find({ postId: postId }).populate('user', 'username email');
        res.send({ post, comments })
    } catch (error) {
        console.error("Error facing single post", error);
        res.status(500).send("Error facing single post");
    }
};

const updatePost = async (req, res) => {
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
};



module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost
}