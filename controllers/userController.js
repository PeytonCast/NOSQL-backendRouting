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
     // Get a single User
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')//the value of thoughts array 
      .populate('friends')//the value of friends array 
      .then(async (SingleUser) =>
        !SingleUser
          ? res.status(404).json({ message: 'No student with that ID' })
          : res.json({
            SingleUser,
      
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
}