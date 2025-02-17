const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5005;

// ✅ CORS Configuration
const corsOptions = {
    origin: 'https://hotels-rooftop-frontend.vercel.app', // ✅ Allow frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // ✅ Allow cookies in cross-origin requests
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle Preflight Requests

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ✅ Routes
const userRoutes = require("./src/routes/auth.user.route");
const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");

app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

app.get('/', (req, res) => {
    res.send('Hotels Rooftop Backend is running 🚀');
});

// ✅ MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
}
connectDB();

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
