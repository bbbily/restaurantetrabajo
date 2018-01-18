let bcrypt = require("bcryptjs");

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = {
  isAuthed: function(req, res, next) {
    if (!req.isAuthenticated()) return res.send("can not get user before login");
    else return next();
  },
  register: (req, res, next) => {
    let db = req.app.get('db');
    let newUser = req.body;
    newUser.password = hashPassword(newUser.password);
    newUser.email = newUser.email.toLowerCase();
    db.users.check_email([newUser.email]).then((user, err) => {
      console.log(err, user)
      if (err) res.status(200).send(err);
      if (user[0]) {
        return res.status(200).send("This email is existing");
      } else {
        db.users.add_user([newUser.email, newUser.password]).then((user, err) => {
          if (err) res.status(200).send(err);
          delete user.password;
          res.status(200).send("sign up successfully!");
        })
      }
    })
  },
  me: (req, res, next) => {
    if (!req.user) return res.status(200).send(false);
    console.log("req.user",req.user)
    return res.status(200).send(req.user);
  },
  updateProfile: (req, res, next) => {
    let updateUser = req.body;
    // req.user = req.body;
    updateUser.user_id = req.user.user_id;
    db.users.save(updateUser, function(err, user) {
      if (err) return res.status(200).send(err);
      delete user.password;
      req.session.passport.user = user;
      console.log("update",user, req.user)
      res.status(200).send(user);
    })
  },
  getUsers: (req, res) => {
    let db = req.app.get('db');
    let query = req.query;
    let findObj = {};
    if (query) {
      for (let prop in query) {
        switch (prop) {
        case 'salary':
          let salaryArr = query.salary.split(',');
          salaryArr[0] = parseInt(salaryArr[0]);
          salaryArr[1] = parseInt(salaryArr[1]);
          findObj['salary >='] = salaryArr[0];
          findObj['salary <='] = salaryArr[1];
          break;
        case 'title':
          let titleArr = query.title.toLowerCase().split(',').map(str => str.trim());
          findObj.or = [{ 'title': titleArr }, { 'title ilike': `%${query.title}%` }]
          break;
        case 'state':
          let stateArr = query.state.toLowerCase().split(',').map(str => str.trim());
          if (query.hasOwnProperty('title')) {
            findObj.or.forEach(obj => obj.or = [{ 'state': stateArr }, { 'state ilike': `%${query.state}%` }]);
          } else {
            findObj.or = [{ 'state': stateArr }, { 'state ilike': `%${query.state}%` }]
          }
          break;
        default:
          findObj[prop] = query[prop];
          break;
        }
      }
      db.jobs.find(findObj).then(jobs => {
        res.send(jobs)
      })
    }
    else {
      db.jobs.get_jobs().then(jobs => {
        res.send(jobs)
      })
    }
  },
  addUser: (req, res) => {
    let db = req.app.get('db');
    let data = req.body;
    let defaultPhone = data.defaultPhone || '6156689287';
    let arr = [ data.companName, data.companyType, data.jobTitle, data.salary,
      data.street, data.city, data.state, data.zipcode,
      data.phone, data.postDate, data.experience, data.description,
      data.freeHousing, defaultPhone];
    db.jobs.add_job(arr).then(jobs => {
      console.log('success')
      res.status(200).send(jobs);
    })
  },
  getOneUser: (req, res) => {
    let db = req.app.get('db');
    db.jobs.get_one_job(req.params.id).then(job => {
      res.status(200).send(job);
    })
  },
  logout: function(req, res, next) {
    req.logout();
    return res.status(200).send("log out");
  }
};
