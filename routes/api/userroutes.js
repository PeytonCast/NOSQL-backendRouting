const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/userController');

// get all users
// path:/api/users
router.route('/').get(getUsers)

// get a single user by an id
// /api/users/:userId
router.route('/:userId').get(getSingleUser)

// make a new user 
// /api/User
router.route('/').get(getUsers).post(createUser);

// delete user by an id
// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)

//  update a user by an id
// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser)

// add a friend
// /api/users/:userId/friends/
router.route('/:userId/friends').post(addFriend);

// remove a friend
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:ObjectId').delete(removeFriend);
module.exports = router;