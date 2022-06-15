require('dotenv').config();
const app = require('./app');
const logger = require('../config/logger');
const port = process.env.PORT || 3000;


require('../config/db');

const server = app.listen(port, () =>
  logger.info(`Server started on port: ${port}`)
);

module.exports = server;