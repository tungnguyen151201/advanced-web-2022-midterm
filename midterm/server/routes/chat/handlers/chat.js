const { Room, Presentation, User } = require('../../../models');

module.exports = async (io, socket) => {
  const { _id } = socket.signature;
  const user = await User.findById({ _id }).lean();
  let room;
  async function joinRoom(roomId) {
    try {
      if (!roomId) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      const roomDb = await Room.findById(
        { presentation: roomId },
        'users presentation'
      ).lean();
      if (!roomDb) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      const { users, presentation } = roomDb;

      const presentDB = await Presentation.findById({
        _id: presentation,
      }).lean();
      if (!presentDB) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      socket.join(roomId);

      io.to(roomId).emit('join-room', {
        user: user.username,
        message: 'joined room',
      });
      room = roomId;
    } catch (error) {
      console.log('chatHandler - joinRoom error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }

  async function chatMessage(message) {
    try {
      if (!room) {
        socket.emit('handle-error', 'Join room to chat!');
        socket.disconnect(true);
        return;
      }

      io.to(room).emit('chat-message', { user: username, message });

      await Room.updateOne(
        { _id: room },
        {
          $push: { messages: { user: _id, message, createAt: Date.now() } },
        }
      );
    } catch (error) {
      console.log('chatHandler - chatMessage error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }

  socket.on('join-room', joinRoom);
  socket.on('chat-message', chatMessage);
};
