const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')
, config = require('./config')
, jobsCtrl = require('../controllers/jobsCtrl')
, usersCtrl = require('../controllers/usersCtrl')
, cors = require('cors')
, path = require('path')
, session = require("express-session")
, passport = require("../services/passport")
, translate = require('google-translate-api')
, app = module.exports = express();

// let corsOptions = {
//   origin: '*',
//   methods: 'GET, HEAD, POST',
//   preflightContinue: true,
//   allowedHeaders: 'Content-Type',
//   credentials: true,
//   optionsSuccessStatus: 200
// }
app.use(express.static(path.join(__dirname + '/../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));app.use(cors());
app.use(session({ secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());


const massiveServer = massive(config.MASSIVE_URI)
.then(db => {
  app.set('db', db);
  db.init();
  app.listen(config.port, console.log(config.port));

  app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

  app.get('/api/jobs', jobsCtrl.getJobs);
  app.get('/api/jobs/:id', jobsCtrl.getOneJob);
  app.post('/api/jobs', jobsCtrl.addJob);
  app.delete('/api/jobs/:id', jobsCtrl.deleteJob);
  app.get('/api/appliedJob', jobsCtrl.getAppliedJobs);
  app.get('/api/appliedJob/:id', jobsCtrl.getOneAppliedJob);
  app.post('/api/appliedJob', jobsCtrl.addAppliedJob);
  app.delete('/api/appliedJob/:id', jobsCtrl.deleteAppliedJob);

  app.get('/api/users/:email', usersCtrl.getOneUser);
  app.get('/api/users', usersCtrl.getUsers);
  app.put('/api/users/:email', usersCtrl.updateUser);
  app.delete('/api/users/:email', usersCtrl.deleteUser);

  app.get('/api/me', usersCtrl.me);
  app.post('/api/register', usersCtrl.register);
  app.get('/api/logOut', usersCtrl.logOut);

  app.post('/api/translate', (req, res) => {
    let text = req.body.text;
    translate(text, {to: 'es'}).then(spanish => {
      res.status(200).send(spanish.text);
    })
  });

  app.post("/auth/local", passport.authenticate("local", {
    successRedirect: "/api/me",
    failureRedirect: "/api/me"
  }));
  // app.get('/auth/facebook', passport.authenticate('facebook'));
  // app.get('/auth/google', passport.authenticate('google'));
  // app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  //   successRedirect: "http://localhost:3000/account/profile",
  //   failureRedirect: "http://localhost:3000/account/login"
  // }));
  // app.get("/auth/google/callback", passport.authenticate("google", {
  //   successRedirect: "http://localhost:3000/account/profile",
  //   failureRedirect: "http://localhost:3000/account/login"
  // }));
})
