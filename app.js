// const path = require('path');
const express = require('express');
// cors auth header(auth)
const cors = require('cors');
const morgan = require('morgan');
// HTTP request logger middleware for node.js
const cookieParser = require('cookie-parser');
// /////////////////////////////////////////
// IMPORTING SECURITY PACKAGES
// /////////////////////////////////////////
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
const mongoSanitize = require('express-mongo-sanitize');
// (express-mongo-sanitize")Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
const xss = require('xss-clean');
// xss is a module used to filter input from users to prevent XSS attacks.
const hpp = require('hpp');
// Express middleware to protect against HTTP Parameter Pollution attacks

const errorHandler = require('./handlers/errorHandler');
// /////////////////////////////////////////
// IMPORTING ROUTERS
// /////////////////////////////////////////

const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const reviewRouter =require('./routes/reviewRoute')

const app = express();

app.use(cors());

/// /////////////////
// 1) GLOBAL MIDDLEWARES
/// /////////////////

// SET SECURITY HTTP HEADERS
app.use(helmet());

// DEVELOPMENT LOGIN
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// LIMIT REQUEST FROM SAME API
const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in hour ',
});

app.use('/api', limiter);

// BODY PARSER,READING DATA FROM BODY INTO REQ.BODY
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

// DATA SANITIZATION AGAINST NO SQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());
// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: ['price'],
  }),
);

/// ///////////////////// ///////
// 2) ROUTE HANDLERS
/// ////////////////////////////

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

// Error for all not existing routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
