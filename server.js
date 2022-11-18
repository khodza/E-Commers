const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection *, Shutting down!');
  process.exit(1);
});

// ("uncaughtException")Indicates if the exception originates from an unhandled rejection or from a synchronous error.

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB connected successifuly');
});
console.log(process.env.NODE_ENV);
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Waiting at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection *, Shutting down!');
  server.close(() => {
    process.exit(1);
  });
});
// The 'unhandledRejection' event is emitted whenever a Promise is rejected and no error handler is attached to the promise within a turn of the event loop.
