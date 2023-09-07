const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
  console.log('User connected!!!');
  io.emit('chat message', `User Connected:  ${socket.id}`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('chat message', `User Disconnected:  ${socket.id}`);
  });
});



server.listen(8000, () => {
  console.log('listening on *:8000');
});