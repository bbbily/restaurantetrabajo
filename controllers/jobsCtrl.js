module.exports = {
  getJobs: (req, res) => {
    let db = req.app.get('db');
    console.log(req.query)
    if (req.query.jobTitle) {
      // db.jobs.get_jobs('').then(jobs => {
      //   res.send(jobs)
      // })
      db.jobs.find({ title: req.query.jobTitle }).then(jobs => {
        res.send(jobs)
      })
    }
    else {
      db.jobs.get_jobs().then(jobs => {
        res.send(jobs)
      })
    }
    let title = req.query.title;
    let salary = req.query.salary;
    let state = req.query.state;
  }
};
