const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const initialPort = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employees');
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
    process.exit(1);
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

connectDatabase().then(() => {
  const startServer = (port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    }).on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error(error);
      }
    });
  };

  startServer(initialPort);
});
