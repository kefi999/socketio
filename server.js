const io = require("socket.io")(3000);

const names = {};
io.on("connection", (socket) => {
  socket.on("input-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      joinedUser: names[socket.id],
    });
  });
  socket.on("joined-name", (nameJoined) => {
    names[socket.id] = nameJoined;
    socket.broadcast.emit("user-connected", names[socket.id]);
  });
});
