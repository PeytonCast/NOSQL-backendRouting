// here is where i will write the create, delete, update, and get routes then export them to the api folder
const { Thoughts, User } = require("../models");

module.exports = {
    // get all thought
    getThoughts(req, res) {
        Thoughts.find()
          .then(async (Thoughts) => {
            const thoughtsObj = {
              Thoughts
            };
            return res.json(thoughtsObj);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
       // Get a single Thought
    getSingleThought(req, res) {
     Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')//the value of reations array 
        .then(async (SingleThought) =>
          !SingleThought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({
              SingleThought,
            })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new thought
    createThought(req, res) {
        Thoughts.create(req.body)

          .then((Thought) => {
            !Thought
            ? res.status(404).json({ message: 'No thoght found' })
            : User.findOneAndUpdate(
                { _id: req.body.userId },//where
                { $push: {thoughts: Thought._id}}//do
                
                ).then((userData) => {res.json(userData)})//if success
                .catch((err) => res.status(500).json(err));
          })

          .catch((err) => res.status(500).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.ThoughtId })
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No thoght found' })
              : User.findOneAndUpdate(
                  { Thoughts: req.params.ThoughtId },
                  { $pull: { Thoughts: req.params.ThoughtId } },
                  { new: true }
                )
          )
          .then((User) =>
            !User
              ? res.status(404).json({
                  message: 'No users found',
                })
              : res.json({ message: 'Thoughts successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // Update a user
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Add a reaction to a Thought
  addReaction(req, res) {

    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },//where
      { $addToSet: { reactions: req.body } },//change
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove reaction from a thought
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that id ' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


}