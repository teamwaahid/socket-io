const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new socket.Server(httpServer);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket => {
  io.to(socket.id).emit('getName');

  socket.on('new-msg', (msg, cb) => {
    socket.broadcast.emit('received-msg', msg, socket.name);
    cb();
  });

  socket.on('setName', (name, cb) => {
    socket.name = name;
    cb();
  });
});

httpServer.listen(3000, () => {
  console.log('Express Server is running @3000');
});
