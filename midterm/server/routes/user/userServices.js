const {
  Register,
  Login,
  Logout,
  MyProfile,
  EditProfile,
} = require('./userController');
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
    const homePageRes = await Login(req.body);
    res.send('home');
  } catch (error) {
    throw error;
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
module.exports = {
  register,
  login,
  getHomePage,
  getProfile,
  editProfile,
  logout,
};
