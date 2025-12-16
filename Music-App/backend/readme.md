# Music Streaming & Chat Application - Backend

A Spotify-inspired music streaming platform with real-time chat features, built with Node.js and Express.js. This backend service handles user authentication, music management, and real-time communication.

# Features

Authentication & User Management
Clerk Authentication: Secure user login and session management

Admin Role System: Single admin user for platform management

User Profiles: Store and manage user data in MongoDB

# Music Management

Admin Music Upload: Exclusive admin access to upload music files

Cloudinary Integration: Secure cloud storage for audio files

Music Libraries: Create and organize music collections

Streaming API: Efficient music streaming endpoints

# Real-time Chat

Socket.IO Integration: Real-time messaging between users

Online User Tracking: See who's online and available to chat

Instant Messaging: Send and receive messages in real-time

 # Production Ready

 Error Monitoring: Sentry integration for error tracking

Environment Configuration: Secure management of sensitive data

CORS Support: Cross-origin resource sharing enabled

# Technologies Used

Runtime: Node.js

Framework: Express.js 5.1.0

Database: MongoDB with Mongoose 9.0.0

Authentication: Clerk (@clerk/express 1.7.53)

File Storage: Cloudinary 2.8.0

Real-time: Socket.IO 4.8.1

Error Tracking: Sentry 10.28.0

Security: CORS, dotenv, express-fileupload

Development: Nodemon 3.1.11

# -------------------------------------  Environment Variables   -------------------------------------

    create .env file and put your data.

# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URL=your_mongodb_connection_string

# Cloudinary (for file storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Authentication (Clerk)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Admin Configuration
ADMIN_EMAIL=admin@yourapp.com

# Error Monitoring (Sentry)
SENTRY_DSN=your_sentry_dsn_url


# -------------------------------------  how to run   ------------------------------------------------


# npn run dev 

npm run dev to start the backend with nodemon

# npn run start 

npm run start to start the backend with node

# npn run seed:songs 

npm run seed:songs insert demy songs in data 

# npn run seed:albums 

npm run seed:albums insert demy albums in data 
