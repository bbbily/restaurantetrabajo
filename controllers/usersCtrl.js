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
      if (err) res.status(200).send(err);
      if (user[0]) {
        return res.status(200).send("This email is existing");
      } else {
        db.users.add_user([newUser.email, newUser.password]).then((user, err) => {
          if (err) res.status(200).send(err);
          delete user.password;
          res.status(200).send(user);
        })
      }
    })
  },
  me: (req, res, next) => {
    if (!req.user) {
      return res.status(200).send(false);
    } else {
      delete req.user.password;
      return res.status(200).send(req.user);
    }
  },
  updateUser: (req, res) => {
    let db = req.app.get('db');
    let data = req.body;
    let arr = [ data.email, data.name, data.city, data.state,
      data.zipcode, data.phone, data.title, data.restaurant_exp,
      data.introduction, data.relocate, data.desired_salary ];
    db.users.update_user(arr).then(user => {
      delete user[0].password;
      req.session.passport.user = user[0];
      res.status(200).send(user[0]);
    })
  },
  deleteUser: (req, res) => {
    let db = req.app.get('db');
    let email = req.params.email;
    db.users.delete_user(email).then(user => {
      console.log('success')
      res.status(200).send(user);
    })
  },
  getUsers: (req, res) => {
    let db = req.app.get('db');
    db.users.get_users().then(users => {
      res.send(users)
    })
  },
  getOneUser: (req, res) => {
    let db = req.app.get('db');
    db.users.check_email([req.params.email]).then((user, err) => {
      if (err) res.status(200).send(err);
      if (user[0]) {
        delete user[0].password;
        return res.status(200).send(user[0]);
      }
    })
  },
  logOut: function(req, res, next) {
    req.logout();
    return res.status(200).send("log out");
  }
};
