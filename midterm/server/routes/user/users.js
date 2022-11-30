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
router.get('/sendVerifyEmail', verifyToken, (req, res) =>
  sendVerifyEmailService(req, res)
);
router.get('/sendInviteEmail/:groupId', verifyToken, (req, res) =>
  sendInviteEmailService(req, res)
);
// router.post('/refresh', (req,res) => {
//   // refresh the damn token
//   const postData = req.body
//   // if refresh token exists
//   if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
//       const user = {
//           "email": postData.email,
//           "name": postData.name
//       }
//       const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
//       const response = {
//           "token": token,
//       }
//       // update the token in the list
//       tokenList[postData.refreshToken].token = token
//       res.status(200).json(response);
//   } else {
//       res.status(404).send('Invalid request')
//   }
// })

module.exports = router;
