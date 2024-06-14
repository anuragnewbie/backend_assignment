const express = require('express');
const userController =  require("../controllers/userController");
const authenticateToken = require('../middleWares.js/verifyToken');

const router = express.Router();

// open routes -->
// route to register new user
router.post('/register', userController.userRegistration);

// // route to login user
router.get('/login', userController.userLogin);

// // protected routes
// // route to fetch all users
router.get('/user', authenticateToken, userController.getLoggedInUser);

// only for super admin
// route to update a user
router.put('/userUpdate/:id', authenticateToken, userController.userUpdate);

// // route to logout user
router.delete('/logout', authenticateToken, userController.userLogout);

module.exports = router;
