const { Register, Login } = require('./userController');
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
module.exports = {
  register,
  login,
  getHomePage,
};
