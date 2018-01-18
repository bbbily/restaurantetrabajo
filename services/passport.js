let passport = require("passport");
let config = require("../server/config");
let localStrategy = require("passport-local").Strategy;
let facebookStrategy = require("passport-facebook").Strategy;
let bcrypt = require("bcryptjs");
let flash = require('connect-flash');
let app = require("../server");


function verifyPassword(reqBodyPassword, userPassword) {
  return bcrypt.compareSync(reqBodyPassword, userPassword);
}

passport.use(new facebookStrategy(config.facebookAuthClient, (req, token, refreshToken, fbuser, done) => {
  let db = req.app.get('db');
  db.users.check_email([fbuser.id], function(err, dbuser) {
    if (err) done(err);
    console.log(dbuser)
    if (!dbuser[0])
      db.add_user([fbuser.id, fbuser.displayName], function(err, user) {
        if (err) done(err);
        console.log("fackbookuser", user);
      })
    else
      fbuser = dbuser[0];
      return done(null, fbuser);
  })
}))

passport.use(new localStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback : true
}, (req, email, password, done) => {
  let db = req.app.get('db');
  email = email.toLowerCase();
  // return done(null, {user: "nouser"});
  db.users.check_email([email]).then((user, err) => {
    if (err) done(err);
    // if (!user[0]) return done(null, false, req.flash('loginMessage', 'No user found.'));
    if (verifyPassword(password, user[0].password)) {
      delete user[0].password;
      return done(null,user[0]);
    } else {
      return done(null, false), req.flash('loginMessage', 'Oops! Wrong password.');
    }
  })
}))

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

module.exports = passport;
