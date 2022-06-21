require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

const URI = process.env.DB_CONNECTION;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((data) => {
    logger.info(`Successfully connected to DB ${data}`);
  })
  .catch((error) => {
    logger.error(error.message);
  });

const db = mongoose.connection.once('open', () => {
  logger.info('Connected to Database.');
});

// Bind connection to error event (to get notification of connection errors)
db.on('error', (error) => logger.error('MongoDB connection error: ', error));

db.on('disconnected', () => logger.info('Mongoose default connection disconnected'));

process.on('SIGINT', () => {
  db.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;
