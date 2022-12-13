const { verifyToken } = require('../../../middleware/auth');

module.exports = async (socket, next) => {
  try {
    // console.log(socket);
    const { token } = socket.handshake.auth;
    // console.log(token);
    const verifyResult = await verifyToken(token);

    if (!verifyResult.isSuccess) {
      next(new Error('Invalid Credentials!'));
      return;
    }
    socket.signature = verifyResult.signature;

    next();
  } catch (error) {
    logger.error('server middleware error:', error);
    next(error);
  }
};
