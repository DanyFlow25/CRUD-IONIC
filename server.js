const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ioniccrud';

async function initMongo() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected to', mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    // Fallback: try in-memory MongoDB for quick local testing (dev only)
    if (process.env.DISABLE_INMEMORY === 'true') {
      console.error('DISABLE_INMEMORY is true — exiting');
      process.exit(1);
    }
    try {
      console.log('Starting in-memory MongoDB (mongodb-memory-server) for dev...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB');
    } catch (e) {
      console.error('Failed to start in-memory MongoDB:', e.message || e);
      process.exit(1);
    }
  }
}

initMongo();

// routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.get('/', (req, res) => res.json({ ok: true, app: 'ionic-mongo-crud-backend' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
