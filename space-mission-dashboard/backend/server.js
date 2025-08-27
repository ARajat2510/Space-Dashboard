require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.error('Exiting due to DB connect failure');
    process.exit(1);
  }

  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  app.use('/api/auth', authRoutes);
  app.use('/api/protected', protectedRoutes);

  app.get('/', (req, res) => res.send('Mission Control API is up'));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
