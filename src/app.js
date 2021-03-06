require('dotenv');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const { bucketRateLimiter } = require('../middleware/rateLimiter');
const { contentNegotiator } = require('../helpers/content-negotiator');

const app = express();

// Routes
const apiRoutes = require('../routes/api');
const userNavigation = require('../routes/userNavigation');

// session middleware
app.use(
  session({
    key: 'user_id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  }),
);

// middleware
app.enable('trust proxy');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());
app.use(cookieParser());
app.use(morgan(':remote-addr :remote-user :method :url :status :response-time ms - :res[content-length]'));
app.use(bucketRateLimiter);
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userNavigation);
app.use('/api', contentNegotiator, apiRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Unknown Request: ${req.method} ${req.originalUrl}` });
});

module.exports = app;
