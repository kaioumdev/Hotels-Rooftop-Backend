// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const port = 5005 || process.env.PORT

// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(cors({
//     origin: 'https://hotels-rooftop-frontend.vercel.app',
//     methods: ["GET", "POST", "PUT", "PATCH", "PUT", "DELETE"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://hotels-rooftop-frontend.vercel.app"); // ✅ Set frontend URL
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });


// // Routes
// const blogRoutes = require("./src/routes/blog.route");
// const commentRoutes = require("./src/routes/comment.route");
// const userRoutes = require("./src/routes/auth.user.route");

// app.use("/api/auth", userRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRoutes);

// app.get('/', (req, res) => {
//     res.send('Hotels Rooftop Backend is running 🚀');
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// // MongoDB Connection
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log('✅ Connected to MongoDB');
//     } catch (error) {
//         console.error('❌ MongoDB Connection Error:', error);
//     }
// }
// connectDB();

// // Export the app for Vercel (Serverless)
// module.exports = app;


// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5005;

// // ✅ Configure CORS properly
// app.use(cors({
//     origin: 'https://hotels-rooftop-frontend.vercel.app', // ✅ Allow only frontend URL
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true, // ✅ Allows cookies/authentication headers
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ Handle Preflight Requests (OPTIONS)
// app.options('*', cors());

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// // ✅ Routes
// const blogRoutes = require("./src/routes/blog.route");
// const commentRoutes = require("./src/routes/comment.route");
// const userRoutes = require("./src/routes/auth.user.route");

// app.use("/api/auth", userRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRoutes);

// app.get('/', (req, res) => {
//     res.send('Hotels Rooftop Backend is running 🚀');
// });

// // ✅ MongoDB Connection
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('✅ Connected to MongoDB');
//     } catch (error) {
//         console.error('❌ MongoDB Connection Error:', error);
//         process.exit(1); // Exit on failure
//     }
// }
// connectDB();

// // ✅ Start Server
// app.listen(port, () => {
//     console.log(`🚀 Server running on port ${port}`);
// });

// // ✅ Export for Vercel (Serverless)
// module.exports = app;

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
