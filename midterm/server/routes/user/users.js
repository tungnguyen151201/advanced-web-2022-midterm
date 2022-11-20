var express = require('express');
var router = express.Router();
const { verifyToken } = require('../../middleware/auth');

const { register, login, getHomePage } = require('./userServices');
router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));
router.get('/home', (req, res) => getHomePage(req, res));

module.exports = router;
