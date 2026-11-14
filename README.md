# Backend Assignment – Node.js, Express & MongoDB

## Project Overview

This project is a REST API backend application developed using Node.js, Express.js, MongoDB Atlas, and Mongoose.

The application allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on posts. The APIs are tested using Postman.

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB Atlas** – Cloud database
- **Mongoose** – MongoDB object modeling library
- **Postman** – API testing
- **bcrypt** – Password hashing
- **express-session** – Session-based authentication
- **dotenv** – Environment variable management
- **Nodemon** – Automatic server restart during development

## Project Structure

```text
backend-assignment/
│
├── backend/
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── userController.js
│       │   └── postController.js
│       ├── middleware/
│       │   └── requireLogin.js
│       ├── models/
│       │   ├── User.js
│       │   └── Post.js
│       ├── routes/
│       │   ├── userRoutes.js
│       │   └── postRoutes.js
│       ├── app.js
│       └── index.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

**Note:** The `.env` file is used locally and is not uploaded to GitHub.

## Features

- User registration
- User login
- Secure password hashing using bcrypt
- Session-based authentication
- Create new posts
- View all posts
- View a single post
- Update existing posts
- Delete posts
- MongoDB Atlas database integration
- REST API testing using Postman

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SHREYA-421/backend_assignment.git
```

### 2. Open the Project Folder

```bash
cd backend_assignment
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

