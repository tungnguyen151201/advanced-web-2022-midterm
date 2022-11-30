var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/auth');

const {
  register,
  login,
  logout,
  getHomePage, 
  activateUser,
  getProfile,
  editProfile,
  sendVerifyEmailService,
  sendInviteEmailService,
  joinGroup,
} = require('./userServices');
router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));
router.post('/logout', verifyToken, (req, res) => logout(req, res));
router.get('/home', verifyToken, (req, res) => getHomePage(req, res));
router.get('/activation/:emailToken', (req, res) => activateUser(req, res));
router.get('/profile', verifyToken, (req, res) => getProfile(req, res));
router.post('/profile/edit/', verifyToken, (req, res) => editProfile(req, res));
router.get('/join/:groupId', verifyToken, (req, res) => joinGroup(req, res));
router.get('/sendVerifyEmail', verifyToken, (req, res) => sendVerifyEmailService(req, res));
router.get('/sendInviteEmail/:groupId', verifyToken, (req, res) => sendInviteEmailService(req, res));

module.exports = router;
