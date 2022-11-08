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
     Thoughts.findOne({ _id: req.params.ThoughtId })
        .select('-__v')
        .populate('reations')//the value of reations array 
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
          .then((Thought) => res.json(Thought))
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
      }


}