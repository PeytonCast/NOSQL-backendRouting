const { User } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const studentObj = {
            users
          };
          return res.json(studentObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
}