const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');


app.use(express.static('../UI/index'))
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: null
  }
}));
app.use(bodyParser({}));
app.use('/',routes)


let sockets = [];
let openRooms = [];

io.on('connection', function (socket) {
 // console.log('a user connected');
  sockets.push(socket);
  socket.on('isRoomExist', (userData) => {
    let room = io.sockets.adapter.rooms[userData.roomName]; // check if room exist
    let positions = userData.positions.map((position) => {
      return position.shipPosition;
    })

    socket.positions = [].concat(...positions);
    socket.roomName = userData.roomName;
    socket.rightGuesses = 0;

    if (room === undefined) {
      socket.join(userData.roomName);
      openRooms.push(userData.roomName);

      sockets.forEach(socket => {
        socket.emit('newRoomCreated', userData.roomName)
      })
    }
    else if (room.length > 0) {
      let clients = io.sockets.adapter.rooms[socket.roomName].sockets;
      let clientsKeys = Object.keys(clients);

      socket.join(userData.roomName);
      io.sockets.in(userData.roomName).emit('roomReady');
      io.sockets.connected[clientsKeys[0]].emit('adminTurn');
      socket.emit('changeOpponentColor')
      openRooms.splice(openRooms.indexOf(userData.roomName), 1)
      sockets.forEach((socket) => {
        socket.emit('deleteRoom', userData.roomName);
      })

    }
  })

  socket.on('checkForShip', (position) => {
    let nsp = io.of('/');
    let clients = io.sockets.adapter.rooms[socket.roomName].sockets; // get clients id in specified room

    for (let client in clients) {
      if (client !== socket.id) {
        let sock = nsp.connected[client]  // get socket object via id on the "url" "/"
        if (sock.positions.includes(position)) {
          socket.emit('positionExist');
          socket.to(socket.roomName).emit('positionRevealed', position)
          socket.rightGuesses++;
        } else {
          socket.emit('noPosition');
        }

      }
    }
  })

  socket.on('turnFinish', () => {
    let clients = io.sockets.adapter.rooms[socket.roomName].sockets;
    if (socket.rightGuesses === 8) {
      socket.emit('youWin');
      socket.to(socket.roomName).emit('youLose');
      io.sockets.in(socket.roomName).emit('gameOver')
      return;
    }
    for (let client in clients) {
      if (client !== socket.id) {
        io.sockets.connected[client].emit('opponentTurn');
        socket.emit('changeOpponentColor')
      }
    }
  })

  sockets.forEach((socket) => {
    if (!socket.openRoomsSend)
      socket.emit('openRooms', openRooms);
    socket.openRoomsSend = true;
  })

  socket.on('leaveRoom', () => {
    socket.leave(socket.roomName);
  })

  socket.on('disconnect', function () {
    socket.to(socket.roomName).emit('leftRoom')
    openRooms.splice(openRooms.indexOf(socket.roomName),1);
    sockets.forEach((socket1) => {
      socket1.emit('deleteRoom', socket.roomName);
    })
    socket.leave(socket.roomName)
    sockets.splice(sockets.indexOf(socket), 1);
   
   // console.log('user disconnected');
  });
});


http.listen(8000, () => {
  console.log('listening on port 8000')
})