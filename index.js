// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();
// const port = process.env.port || 5000;

// //parse options
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

// //routes
// const blogRoutes = require("./src/routes/blog.route");
// const commentRoutes = require("./src/routes/comment.route");
// const userRoutes = require("./src/routes/auth.user.route");

// //use routes
// app.use("/api/auth", userRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRoutes);
// async function main() {
//     await mongoose.connect(process.env.MONGODB_URL);
//     app.get('/', (req, res) => {
//         res.send('Hotels Rooftop server is running.....!')
//     })
// };

// main().then(() => console.log('connect mongodb successfully')).catch(err => console.log(err));

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Change to your frontend URL
    credentials: true
}));

// Routes
const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");
const userRoutes = require("./src/routes/auth.user.route");

app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

app.get('/', (req, res) => {
    res.send('Hotels Rooftop Backend is running 🚀');
});

// MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
    }
}
connectDB();

// Export the app for Vercel (Serverless)
module.exports = app;
