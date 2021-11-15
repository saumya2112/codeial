const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/profile' , usersController.profile);
router.get('/sign-Up' , usersController.signUp);
router.get('/sign-In' , usersController.signIn);
router.use('/posts' , require('./posts'));

module.exports = router;