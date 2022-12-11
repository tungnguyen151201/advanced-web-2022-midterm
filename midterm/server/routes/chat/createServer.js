const { Server } = require('socket.io');
const {
  chatHandlers,
  errorHandlers,
  connectionHandlers,
} = require('./handlers');
const { ioMiddlewares } = require('./middlewares');

const io = new Server();
const onConnection = (socket) => {
  connectionHandlers(socket);
  chatHandlers(io, socket);
  errorHandlers(socket);
};

io.use(ioMiddlewares);
io.on('connection', onConnection);

module.exports = io;
