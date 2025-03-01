# Aura Store - E-Commerce Platform

A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User Authentication (Login/Register)
- Product Management
- Shopping Cart Functionality
- Order Management
- Session Management
- Complaint Management System
- Coupon System
- Cross-Origin Resource Sharing (CORS) enabled

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Session with MongoDB Store
- Authentication using bcrypt
- CORS for cross-origin requests

### Frontend
- React.js
- React Router DOM for routing
- Modern UI components
- Responsive design

## Prerequisites

Before running this application, make sure you have:
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd aura-store
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

## Running the Application

1. Start the Backend Server:
```bash
cd backend
npm start
```
The server will start on http://localhost:3000

2. Start the Frontend Development Server:
```bash
cd frontend
npm start
```
The frontend will start on http://localhost:5173

## API Endpoints

The backend provides several RESTful API endpoints:

- `/auth/*` - Authentication routes
- `/adminauth/*` - Admin authentication routes
- `/cart/*` - Shopping cart operations
- `/complaints/*` - Complaint management
- `/coupon/*` - Coupon management

## Security Features

- Session-based authentication
- Secure password hashing with bcrypt
- CORS protection
- HTTP-only cookies
- Environment variable protection


## License

This project is licensed under the ISC License.

