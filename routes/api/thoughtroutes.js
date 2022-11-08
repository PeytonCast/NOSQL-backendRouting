const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController');

// get all thoughts
// path:/api/thoughts
router.route('/').get(getThoughts)

// get a single thought by an id
// /api/thoughts/:userId
router.route('/:thoughtId').get(getSingleThought)

// create a Thought
// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// update thought
// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId').get(getSingleThought).delete(deleteThought);
module.exports = router;