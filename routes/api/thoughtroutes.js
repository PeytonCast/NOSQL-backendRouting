const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
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

// delete thought
// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// delete thought
// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought);

// add a reaction 
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// remove a reaction
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions').delete(removeReaction);
module.exports = router;