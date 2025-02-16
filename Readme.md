# Backend - Hotels Rooftop Blog

This is the backend server for a blog project focused on hotels with rooftop pools. It is built using Node.js, Express, and MongoDB.

## Technologies Used

*   **Node.js:**  JavaScript runtime environment.
*   **Express:**  A web application framework for Node.js.
*   **MongoDB:**  A NoSQL database.
*   **Mongoose:**  An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens):**  For user authentication and authorization.
*   **Cookie-parser:** Middleware to parse cookies.
*   **Body-parser:** Middleware to parse request bodies.
*   **CORS:** Middleware to enable Cross-Origin Resource Sharing.
*   **dotenv:**  For managing environment variables.

## Project Structure

Key directories and files:

*   `src/`: Contains the main application code.
    *   `model/`: Mongoose models for User, Blog, and Comment.
    *   `routes/`: Express routes for different resources (auth, blogs, comments).
    *   `controllers/`:  Logic for handling requests for each route.
    *   `middleware/`: Custom middleware functions (e.g., authentication, authorization).

*   `index.js`: Main entry point for the application.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kaiyumdev/Hotels-Rooftop-Backend
    cd Hotels-Rooftop-Backend  # Or the name of your backend directory
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # Or yarn install
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the root directory.
    *   Add the following environment variables:

        ```
        PORT=5000             # The port the server will listen on
        MONGODB_URL=<your_mongodb_connection_string> # MongoDB connection string
        JWT_SECRET_KEY=<your_jwt_secret_key>    # Secret key for JWT signing
        ```

    *   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.
    *   Replace `<your_jwt_secret_key>` with a strong, randomly generated secret key.  **Keep this secret!**

4.  **Start the server:**

    ```bash
    npm start  # Or yarn start
    ```

    This will start the server, typically on `https://hotels-rooftop-backend-ivory.vercel.app`.

## API Endpoints

*   `/api/auth`: User authentication routes.
    *   `POST /register`: Register a new user.
    *   `POST /login`: Login an existing user.
    *   `POST /logout`: Logout the current user.
    *   `GET /users`: Get all registered users (admin only).
    *   `DELETE /users/:id`: Delete a user (admin only).
    *   `PUT /users/:id`: Update a user's role (admin only).
*   `/api/blogs`: Blog post routes.
    *   `POST /blogs/create-post`: Create a new blog post (admin only).
    *   `GET /blogs`: Get all blog posts.
    *   `GET /blogs/:id`: Get a single blog post by ID.
    *   `PATCH /blogs/update-post/:id`: Update a blog post (admin only).
    *   `DELETE /blogs/:id`: Delete a blog post (admin only).
    *   `GET /blogs/related/:id`: Get related blog posts.
*   `/api/comments`: Comment routes.
    *   `POST /comments/post-comment`: Post a new comment.
    *   `GET /comments/total-comments`: Get total comments counts.

## Authentication and Authorization

*   User authentication is implemented using JWTs (JSON Web Tokens).
*   Upon successful login, a JWT is generated and sent to the client as a cookie.
*   The `verifyToken` middleware verifies the JWT in subsequent requests.
*   The `isAdmin` middleware checks if the user has admin privileges.

## Models

*   **User:**
    *   `email`: User's email address (required, unique).
    *   `password`: User's password (required).
    *   `username`: User's username (required).
    *   `role`: User's role ('user' or 'admin').
*   **Blog:**
    *   `title`: Title of the blog post (required).
    *   `content`: Content of the blog post (using Editor.js format).
    *   `coverImg`: URL of the cover image (required).
    *   `description`: Meta description of the blog post (required).
    *   `category`: Category of the blog post (required).
    *   `rating`: Rating of the blog post (required).
    *   `author`: Reference to the User model (the author of the post).
    *   `createdAt`: Timestamp of when the post was created.
*   **Comment:**
    *   `comment`: The comment text.
    *   `user`: Reference to the User model (the commenter).
    *   `postId`: Reference to the Blog model (the post the comment belongs to).
    *   `createdAt`: Timestamp of when the comment was created.

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with descriptive messages.
4.  Push your branch to your fork.
5.  Submit a pull request.

## Deploying Live

To deploy this backend server live, you can use platforms like Vercel, Heroku, AWS, Google Cloud, or Digital Ocean.

**Vercel Live Link:** [Live](https://hotels-rooftop-backend-ivory.vercel.app/).