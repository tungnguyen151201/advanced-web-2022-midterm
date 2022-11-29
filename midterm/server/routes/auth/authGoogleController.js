const generateTokens = require('../untils/generateToken');
async function callbackGoogle(req, res) {
  const userId = req.session.passport.user;
  const { accessToken, refreshToken } = await generateTokens({
    _id: userId,
  });

  res.status(200).send({
    status: true,
    message: 'login success!',
    accessToken,
    refreshToken,
  });
}

module.exports = {
  callbackGoogle,
};
