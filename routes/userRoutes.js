const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//get sign up
router.get('/new', controller.signUp);

//create new user
router.post('/', controller.createUser);

//get login
router.get('/login', controller.login);

//process login request
router.post('/login', controller.getUser);

//get profile
router.get('/profile', controller.profile);

//logout user
router.get('/logout', controller.logout);

module.exports = router;