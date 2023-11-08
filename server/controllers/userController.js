const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const userController = {};


/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err)
      return next(
        `Error in userController.getAllUsers: ${JSON.stringify(err)}`
      );

    // Store retrieved users in res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

function badPassword(pw) { return !pw || typeof pw !== 'string' || pw.length < 3; }

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  // Read and validate username/pw from request body
  const { username, password } = req.body;

  if (username === undefined || badPassword(password)) {
    // Invalid user creation request
    return res.send('Error! Please enter a username and password.');
  }

  // Add user to database

  User.create({ username, password })
    .then((result) => {
      res.locals.username = result;
      res.locals.userId = result._id;
      next();
    })
    .catch((err) => {
      next(`Database error: Could not create user: ${err}`);
    });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || badPassword(password)) {
    return next('No username and password found.');
  }

  User.findOne({ username: username }).then((err, user) => {
    if (err) {
      return next('Database error.');
    } else if (!user) {
      // No user found.
      return res.redirect('/signup');
      // For security purposes, don't redirect immediately!
      // setTimeout(() => res.redirect('/signup'), 500);
    }
    bcrypt.compare(password, user.password, (err, isCorrect) => {
      if (err) {
        return next(`bcrypt error: ${err}`);
      }
      if (isCorrect) {
        res.locals.userId = user._id;
        return next();
      } else {
        // Invalid password. Don't let the user know the username was correct!
        res.redirect('/signup');
      }
    });
  });
};

module.exports = userController;
