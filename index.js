const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;

//parse options
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//routes
const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");
const userRoutes = require("./src/routes/auth.user.route");

//use routes
app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    app.get('/', (req, res) => {
        res.send('Hotels Rooftop server is running.....!')
    })
};

main().then(() => console.log('connect mongodb successfully')).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})