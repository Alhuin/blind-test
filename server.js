const express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

let id = 1;
let musics = [];
const users = [];
const corrections = [];
const scores = [];

const shuffle = function (array) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};


io.on('connection', (socket) => {

  console.log('user connected');

  // Click Enter in auth

  socket.on('enter', (userName, addedMusics) => {

    socket.username = userName;
    socket.i = 0;

    console.log(socket.username + 'entered loading screen');

    addedMusics.forEach((music) => {
      musics.push(music);
    });

    console.log(addedMusics);

    if (!users.length) {
      socket.emit('admin');
      console.log(socket.username + 'isAdmin');
    }
    users.push({ name: userName, nbMusics: addedMusics.length });
  });

  // On Loading screen
  socket.on('getUsers', () => {
    io.emit('setUsers', users);
  });

  socket.on('beginPlay', () => {
    musics = shuffle(musics);
    musics.forEach((music) => {
      music.id = id;
      id++;
    });

    console.log('user ' + socket.username + ' clicked Play on Loading screen, going to Play');
    io.emit('begin')
  });

  socket.on('getMusics', () => {
    console.log('sending musics');
    socket.emit('sendMusics', musics);
  });


  socket.on('getNextUrl', function() {
    console.log('GNU');
    console.log(socket.username);
    console.log(socket.i);
    if (socket.i === musics.length) {
      console.log('sending endPlaylist to ' + socket.username);
      socket.emit('endPlaylist');
    } else {
      socket.emit('nextUrl', musics[socket.i].id, musics[socket.i].link);
      socket.i++;
    }
  });

  socket.on('sendCorrection', (correction) => {
    const user = socket.username;
    console.log('revieved sendCorreection');
    console.log(correction);
    corrections.push({ user, correction: correction.lines, points: correction.points });
    scores.push({ user, points: correction.points });
  });

  socket.on('getCorrections', () => {
    console.log('emitting setCorrections');
    console.log(corrections);
    console.log(scores);
    io.emit('setCorrections', corrections, scores);
  });
  socket.on('launchedPlaylist', function() {
    io.emit('launch');
  });

  socket.on('disconnect', function(userNickname) {
    console.log(userNickname +' has left ');
  })
});

app.get('/', (req, res) => {

  res.send('Chat Server is running on port 3000')
});


server.listen(8080,()=>{

  console.log('Node app is running on port 3000')

});