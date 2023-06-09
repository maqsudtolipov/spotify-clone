const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const playlistRouter = require('./playlistRoutes');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/isLoggedIn', authController.isLoggedIn);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, authController.deleteMe);

// User
router.get('/:id', authController.protect, userController.getArtist);

// Playlists
router.use('/:userId/playlists', playlistRouter);

// Manage likes
router
  .route('/likes')
  .get(authController.protect, userController.getLikedSongs)
  .post(authController.protect, userController.likeSong)
  .delete(authController.protect, userController.unlikeSong);

module.exports = router;
