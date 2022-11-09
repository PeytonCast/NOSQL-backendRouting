const { User, Thoughts } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users
          };
          return res.json(userObj);
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
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            SingleUser,
      
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a User
      createUser(req, res) {
        User.create(req.body)
          .then((User) => res.json(User))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'user and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
// Update a user
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {

      User.findOneAndUpdate(
        { _id: req.params.userId },//where
        { $addToSet: { friends: req.body.friendId } },//add the user id of another user to the friend
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that id' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    // Remove reaction from a thought
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.body.friendId } },
        { runValidators: true, new: true }
      ) 
        .then((friends) =>
          !friends
            ? res
                .status(404)
                .json({ message: 'No friends found with that id ' })
            : res.json(friends)
        )
        .catch((err) => res.status(500).json(err));
    },
  
}