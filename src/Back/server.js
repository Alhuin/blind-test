const express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

let id = 1;
let musics = [];
let users = [];
let corrections = [];
let scores = [];

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

  // Click entered loading screen

  socket.on('enter', (userName, addedMusics) => {

    socket.username = userName;

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


  socket.on('getNextUrl', function(index) {
    console.log('GNU');
    console.log(socket.username);
    console.log(index);
    if (index === musics.length) {
      console.log('sending endPlaylist to ' + socket.username);
      socket.emit('endPlaylist');
    } else {
      socket.emit('nextUrl', musics[index].id, musics[index].link);
    }
  });

  socket.on('sendCorrection', (userName, correction) => {
    console.log('received correction from ' + userName);
    console.log(correction);
    corrections.push({ user: userName, correction: correction.lines, points: correction.points });
    scores.push({ user: userName, points: correction.points });
  });

  socket.on('getCorrections', () => {
    console.log('emitting setCorrections');
    console.log(corrections);
    console.log(scores);
    io.emit('setCorrections', corrections, scores, users.length);
    if (corrections.length === users.length) {
      id = 1;
      musics = [];
      users = [];
      corrections = [];
      scores = [];
    }
  });

  socket.on('launchedPlaylist', function() {
    io.emit('launch');
  });

  socket.on('disconnect', function(userNickname) {
    console.log(userNickname +' has left ');
  })
});

app.get('/', (req, res) => {
  res.send('Blind test Server')
});


server.listen(8080,()=>{

  console.log('Node app is running on port 8080')

});