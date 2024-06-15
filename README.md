# PERN Chat Application

A real-time chat application built using the PERN stack (PostgreSQL, Express.js, React, Node.js). This application allows users to communicate in real-time through web sockets.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Technologies](#technologies)

## Features

- Real-time messaging with Socket.IO
- User authentication with JWT and bcrypt
- PostgreSQL database with Prisma ORM
- Modular and scalable code structure

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ahmed-abdelhameed1706/fullstack-chat.git
   cd fullstack-chat
   ```

2. Install backend dependencies:

   ```sh
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add your environment variables:

   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   ```

4. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Scripts

- `dev`: Starts the development server with Nodemon for backend and React development server for frontend.
- `build`: Compiles TypeScript files, installs dependencies, generates Prisma client, and builds the React app.
- `start`: Starts the production server.

## Technologies

- **Backend**:

  - Node.js
  - Express.js
  - Prisma
  - PostgreSQL
  - Socket.IO
  - JWT
  - bcrypt

- **Frontend**:
  - React
  - Socket.IO-client
