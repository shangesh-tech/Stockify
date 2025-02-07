const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserDetails, updateProfile } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Logout User
router.get('/logout',isAuthenticatedUser, logoutUser);

// Get User Details
router.get('/me',isAuthenticatedUser, getUserDetails);

// Update Password
router.put('/updateprofile',isAuthenticatedUser, updateProfile);

// Route to check if user is authenticated
router.get('/check-auth', isAuthenticatedUser, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});


module.exports = router;