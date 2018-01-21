const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')
, config = require('./config')
, jobsCtrl = require('../controllers/jobsCtrl')
, usersCtrl = require('../controllers/usersCtrl')
, cors = require('cors')
, session = require("express-session")
, passport = require("../services/passport")
, flash = require('connect-flash')
, app = module.exports = express();

// let corsOptions = {
//   origin: '*',
//   methods: 'GET, HEAD, POST',
//   preflightContinue: true,
//   allowedHeaders: 'Content-Type',
//   credentials: true,
//   optionsSuccessStatus: 200
// }
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const massiveServer = massive(config.MASSIVE_URI)
.then(db => {
  app.set('db', db);
  db.init();
  app.listen(config.port, console.log(config.port));

  app.get('/api/jobs', jobsCtrl.getJobs);
  app.get('/api/jobDetails/:id', jobsCtrl.getOneJob);
  app.post('/api/job', jobsCtrl.addJob);
  app.post('/api/appliedJob', jobsCtrl.addAppliedJob);

  // app.post('/api/register', usersCtrl.register);
  // app.get('/auth/facebook', passport.authenticate('facebook'));
  // app.get('/auth/google', passport.authenticate('google'));
  // app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  //   successRedirect: "http://localhost:3000/account/profile",
  //   failureRedirect: "http://localhost:3000/account/login"
  // }));
  // app.get("/auth/google/callback", passport.authenticate("facebook", {
  //   successRedirect: "http://localhost:3000/account/profile",
  //   failureRedirect: "http://localhost:3000/account/login"
  // }));
  // app.post("/auth/local", passport.authenticate("local", {
  //   failureRedirect: "http://localhost:3000/account/profile",
  //   failureFlash: true
  // }), (req, res) => {
  //   console.log(req.user);
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type');
  //   return res.redirect("http://localhost:3000/account/profile")
  //   res.send(req.user)
  // });
})
