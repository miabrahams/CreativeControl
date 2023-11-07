/* Server setup */
const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
const cookieParser = require('cookie-parser');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const CONFIG = require('./config.js');
require('dotenv').config();

/* Mongoose setup*/
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'production' ? CONFIG.mongo_prod : CONFIG.mongo_dev;
mongoose.connect(mongoURI);

/* Image upload */
const imageRouter = require('./routes/image.js');
app.use('/image', imageRouter);

// Temp
app.get('/api/', (req, res) => {
  return res.status(200).json({ code: '✨✨✨' });
});




/* Signup and login */
const sessionController = require('./controllers/sessionController');
/*
app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => { // If the post request is successful
    res.redirect('/console');
  }
);
*/

/**
 * Authorized routes
 */
app.get('/console',
  sessionController.isLoggedInTEST,
  (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/secret.html'));
});

/**
 * Static routes
 */

// if (process.env.NODE_ENV === 'production') {

app.use('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// }

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  let log = err;
  let message = err;
  let httpStatus = 500;

  if (typeof err === 'object') {
    ({ log, message, httpStatus } = err);
  }

  console.log(log);
  res.status(httpStatus).send({ error: message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
