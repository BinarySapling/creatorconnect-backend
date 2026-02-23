# CreatorConnect Backend

Backend API for CreatorConnect - A platform for creators to connect, share assets, and collaborate.

## Features

- User authentication with JWT
- Email verification with OTP
- Real-time chat using Socket.IO
- Asset management with image upload
- File upload to Cloudinary
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Nodemailer for email services
- Cloudinary for file storage
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Gmail account for email services

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BinarySapling/creatorconnect-backend.git
cd creatorconnect-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/creatorconnect
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `EMAIL_USER` - Email address for sending OTPs
- `EMAIL_PASS` - Email app password (for Gmail, generate from Google Account settings)

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup/initiate` - Initiate signup and send OTP
- `POST /auth/signup/verify` - Verify OTP and complete registration
- `POST /auth/login` - User login
- `GET /auth/users` - Search users

### Assets
- `GET /assets` - Get all public assets
- `POST /assets` - Create new asset
- `GET /assets/:id` - Get asset by ID
- `PUT /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset

### Chat
- `GET /chat/conversation` - Get user conversations
- `POST /chat` - Create or get conversation
- `GET /chat/:conversationId` - Get messages in a conversation

## Project Structure

```
src/
├── config/          # Configuration files (database, cloudinary)
├── controllers/     # Route controllers
├── middleware/      # Custom middleware (auth, upload)
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── sockets/         # Socket.IO configuration
├── utils/           # Utility functions
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## License

ISC
