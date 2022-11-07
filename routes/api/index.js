// this is where i will validate all of the routes from controlers
const router = require('express').Router();
const userRoutes = require('./userroutes')
router.use('/users', userRoutes);

module.exports = router;