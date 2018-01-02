module.exports = {
  getJobs: (req, res) => {
    let db = req.app.get('db');
    if (req.query) {
      db.jobs.get_jobs('').then(jobs => {
        res.send(jobs)
      })
    }
    else {
      db.jobs.get_jobs().then(jobs => {
        res.send(jobs)
      })
    }
    // db.jobs.get_jobs_by_query(['fryer,server,sushi chef']).then(jobs => {
    //   res.send(jobs)
    // })
  }
};
