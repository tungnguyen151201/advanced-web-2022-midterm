var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/auth');

const {
  register,
  login,
  logout,
  getHomePage,
  getProfile,
  editProfile,
} = require('./userServices');
router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));
router.post('/logout', verifyToken, (req, res) => logout(req, res));
router.get('/home', verifyToken, (req, res) => getHomePage(req, res));
router.get('/profile', verifyToken, (req, res) => getProfile(req, res));
router.post('/profile/edit/', verifyToken, (req, res) => editProfile(req, res));

module.exports = router;
