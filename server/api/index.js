const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const employeeRoutes = require('../routes/employees');
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Employee Management API is running');
});

async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB');
      return;
    }

    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

connectDatabase();

module.exports = app;
