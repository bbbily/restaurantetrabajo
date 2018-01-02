const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')
, config = require('./config')
, cors = require('cors')
, app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());


const massiveServer = massive(config.massiveServer)
.then(db => {
  app.set('db', db);
  db.init(function() {});
  app.listen( config.port, console.log(config.port))
})


app.get('/api/jobs', (req, res) => {
  db.getJobs((err, users) => {
    if (err) console.log(err);
    res.status(200).send(users);
  })
});
