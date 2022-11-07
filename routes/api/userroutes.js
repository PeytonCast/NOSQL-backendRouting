const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
  } = require('../../controllers/userController');

// get all users
// path:/api/users
router.route('/').get(getUsers)
// get a single user by an id
// /api/users/:userId
router.route('/:userId').get(getSingleUser)
module.exports = router;