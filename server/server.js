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

/* Image upload: older */
// const imageRouter = require('./routes/image.js');
// app.use('/image', imageRouter);


/* Image upload: by asset */
const assetRouter = require('./routes/asset.js');
app.use('/asset', assetRouter);

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
  sessionController.validateLoginTest,
  (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/secret.html'));
});

app.use('/static/demo',
  // Control access to images
  sessionController.validateLoginTest,
  express.static(path.resolve(__dirname, '../demo_assets'))
);

/**
 * Static routes
 */

// if (process.env.NODE_ENV === 'production') {

app.use('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/', (req, res) => {
  console.log('Getting main');
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
function errorHandler (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
}
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
