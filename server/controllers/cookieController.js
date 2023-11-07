const cookieController = {};

const COOKIE_OPTIONS = { httpOnly: true };

/**
 * setSSIDCookie - Create a Session ID Cookie
 */
cookieController.setSessionCookie = (req, res, next) => {
  // Session ID is User._id created by MongoDB.
  if (!res.locals.userId) next('Unable to create cookie: UserId not found.');
  res.cookie('ccsession', res.locals.userId, COOKIE_OPTIONS);
  next();
};

module.exports = cookieController;
