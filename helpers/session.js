const checkSession = (req, res, next) => {
  if (req.session.email && req.cookies.user_id) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.session.email && req.cookies.user_id) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports.checkSession = checkSession;
module.exports.isAuthenticated = isAuthenticated;
