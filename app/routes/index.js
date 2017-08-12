var path = process.cwd()
var Handler = require(path + '/app/controllers/handler.server.js')
module.exports = function (app, passport) {
  var handler = new Handler();
  //sendFile

  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
      res.redirect('/nonuser')
		}
	}
  app.route('/nonuser')
    .get((req,res) => {
      res.sendFile(`${path}/public/nonuser.html`)
    })

  app.route('/')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/home.html`)
    })

  //login or logout
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

  //api
  app.route('/api')
    .post(isLoggedIn, handler.going)
    .get(handler.getPeople)
};
