const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')
, config = require('./config')
, jobsCtrl = require('../controllers/jobsCtrl')
, cors = require('cors')
, app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/jobs', jobsCtrl.getJobs);

const massiveServer = massive(config.MASSIVE_URI)
.then(db => {
  app.set('db', db);
  db.init();
  app.listen( config.port, console.log(config.port))
})

console.log('test')
