const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const { errorHandler } = require('./utils/errors');

require('dotenv').config();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);

// Global Error Handler
app.use(errorHandler);

// Server
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
