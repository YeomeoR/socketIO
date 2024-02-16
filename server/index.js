const io = require('socket.io')(3000, { // options object for CORS (live server)
  cors: {
    origin: ['http://127.0.0.1:5500']
  }

});

io.on('connection', socket => {
  console.log(socket.id);
  // socket.on('custom-event', (number, string, obj) => {
  //   console.log(number, string, obj);
  // });
  socket.on('send-message', (message, room) => {
    if (room == '') {

      socket.broadcast.emit('receive-message', message); // broadcast - doesn't send to self but displays to everyone because of displayMessage function
    } else {
      socket.to(room).emit('receive-message', message);
    }
    console.log(message);
  });
  socket.on('join-room', room => {
    socket.join(room);
  });
});