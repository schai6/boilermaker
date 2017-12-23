const router = require('express').Router();
const User = require('../db/models/user');
const passport = require('passport');

router.post('/login', (req, res, next) => {
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      user.hasMatchingPassword(req.body.password)
      .then(checkedPassword => {
        if (!checkedPassword) res.status(401).send('Incorrect password');
        else {
          req.login(user, err => {
            if (err) next(err);
            else res.json(user);
          });
        }
      });
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

/* google oauth */
router.get('/google', passport.authenticate('google', { scope: 'email' }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
            return null;
          });
      } else {
        done(null, user);
        return null;
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

module.exports = router;
