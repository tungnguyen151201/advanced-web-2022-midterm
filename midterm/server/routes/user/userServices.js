const {
  Register,
  Login,
  Activate,
  Logout,
  MyProfile,
  EditProfile,
  JoinGroup,
} = require('./userController');
const { sendVerifyEmail, sendInviteEmail} = require('../utils/sendEmail');

async function register(req, res) {
  try {
    const registerRes = await Register(req.body);
    res.send(registerRes);
  } catch (error) {
    throw error;
  }
}

async function login(req, res) {
  try {
    const loginRes = await Login(req.body);
    res.header('Authorization', loginRes.token).send(loginRes);
  } catch (error) {
    throw error;
  }
}
async function getHomePage(req, res) {
  try {
    await Login(req.body);
    res.send('home');
  } catch (error) {
    throw error;
  }
}

async function activateUser(req, res) {
  try {
    const { emailToken } = req.params;
    await Activate(emailToken);
    res.send('Activate successful');
  } catch (error) {
    res.send('Activate failed');
  }
}
async function getProfile(req, res) {
  try {
    const myProfileRes = await MyProfile(req.user._id);
    res.send(myProfileRes);
  } catch (error) {
    throw error;
  }
}
async function editProfile(req, res) {
  try {
    const editProfileRes = await EditProfile(req.user._id, req.body);
    res.send(editProfileRes);
  } catch (error) {
    throw error;
  }
}
async function logout(req, res) {
  try {
    const logoutRes = await Logout(req.user._id, req.refreshToken);
    res.send(logoutRes);
  } catch (error) {
    throw error;
  }
}
async function sendVerifyEmailService(req, res) {
  try {
    await sendVerifyEmail(req.user.id, req.user.email);
    res.redirect('/');
  } catch (error) {
    throw error;
  }
}
async function sendInviteEmailService(req, res) {
  try {
    await sendInviteEmail(req.body.email, req.params.groupId);
    res.redirect('/');
  } catch (error) {
    throw error;
  }
}
async function joinGroup(req, res) {
  try {
    const msg = await JoinGroup(req.user.id, req.params.groupId);
    res.send(msg);
  } catch (error) {
    res.send('Join failed');
  }
}
module.exports = {
  register,
  login,
  getHomePage,
  activateUser,
  getProfile,
  editProfile,
  logout,
  sendVerifyEmailService,
  sendInviteEmailService,
  joinGroup,
};
