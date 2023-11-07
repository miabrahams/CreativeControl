const Session = require('../models/SessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  const newLocal = 'Checking for valid session';
  // write code here
  console.log(newLocal);
  const cookieId = req.cookies.ssid;
  Session.findOne({ cookieId }).then((session) => {
    if (session !== null) {
      // Pull Github token from session if available
      // Then return
      console.log('Valid session!');
      if (session.OAuth.token) {
        console.log('Valid OAuth Token!');
        res.locals.OAuth = session.OAuth;
      }
      return next();
    } else {
      // Not logged in: redirect to signup
      res.redirect('/signup');
    }
  });
};

sessionController.isLoggedInTEST = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  next();
}

/**
 * startSession - create and save a new Session into the database.
 */

sessionController.startSession = (req, res, next) => {
  const cookieId = res.locals.userId;
  // For upsert, you need to include a query like find() as well as additional properties to update

  // For an OAuth user, store their OAuth token in the Session data
  // For a normal user, store no info there.$

  const OAuth = { token: null, type: null };
  if (res.locals.access_token) {
    OAuth.token = res.locals.access_token;
    OAuth.type = 'github';
  }

  Session.updateOne(
    { cookieId },
    { createdAt: Date.now(), OAuth },
    { strict: true, upsert: true }
  )
    .then((res) => {
      // Successfully created session!
      return next();
    })
    .catch((err) => {
      return next(`Could not create session: ${err}`);
    });
};

module.exports = sessionController;
