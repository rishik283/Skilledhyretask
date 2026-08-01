# Employee Management System

A simple MERN stack employee management application with CRUD operations, search, and responsive UI.

## Features
- View all employees in a table
- Add new employees
- Edit existing employees
- Delete employees
- Search employees by name
- Validation for required fields and unique email

## Project Structure
- server/ - Express + MongoDB backend
- client/ - React frontend

## Setup

### 1. Install server dependencies
```bash
cd server
npm install
```

### 2. Install client dependencies
```bash
cd ../client
npm install
```

### 3. Start the backend
```bash
cd server
npm run dev
```

### 4. Start the frontend
```bash
cd client
npm run dev
```

### 5. Open the app
Visit http://localhost:3000

## Environment
The server uses an in-memory MongoDB instance by default. If you want to use a real MongoDB database, set `MONGODB_URI` inside `server/.env`.
