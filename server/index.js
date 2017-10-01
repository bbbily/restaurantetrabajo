const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')
, config = require('./config')
, app = module.exports = express();

app.use(bodyParser.json());

const massiveServer = massive(config.MASSIVE_URI)
.then(db => {
  app.set('db', db);
  db.init();
  app.listen( config.port, console.log(config.port))
})
