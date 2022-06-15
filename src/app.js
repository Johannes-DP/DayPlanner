const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const compression = require('compression');
const { rateLimiterMiddleware } = require('../middleware/rateLimiter');

const app = express();


// routes
const auth = require('../routes/auth');

// middleware
app.enable("trust proxy");
app.use(express.static(path.join(__dirname, '../public')));
app.use(helmet());
app.use(compression());
app.use(morgan(':remote-addr :remote-user :method :url :status :response-time ms - :res[content-length]'));
app.use(rateLimiterMiddleware);
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'alphabot' });
});


app.use('/user', auth);


app.use((req, res) => {
  res.status(404).json({status: 404, message: `Unknown Request: ${req.method} ${req.originalUrl}`});
});

module.exports = app;