const express = require('express'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

const typoTolerance = 3;
const scores = [];
let id = 1;
const musics = [];
const users = [];

const strcmp = (str1, str2) => {
  const s1 = str1.replace(' ', '').toLowerCase();
  const s2 = str2.replace(' ', '').toLowerCase();
  let diff = 0;

  s2.split('').forEach(function(val, i){
    if (val !== s1.charAt(i))
      diff += 1;
  });

  console.log(`diff ${s1} vs ${s2} = ${diff}`)
  return diff;
};

io.on('connection', (socket) => {

  console.log('user connected');

  // Click Enter in auth

  socket.on('enter', (userName, addedMusics) => {

    socket.username = userName;
    socket.i = 0;

    console.log(socket.username + 'entered loading screen');

    addedMusics.forEach((music) => {
      music.id = id;
      id++;
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
      socket.emit('endPlaylist');
    } else {
      socket.emit('nextUrl', musics[socket.i].link);
      socket.i++;
    }
  });

  socket.on('submit', (userNickname, answers) => {
    console.log('submit');
    let points = 0;
    const correct = [];

    answers.forEach((answer) => {
      const { id, artist, title } = answer;
      musics.forEach((song) => {
        if (song.id.toString() === id.toString()) {
          if (strcmp(artist, song.artist) < typoTolerance) {
            points += 1;
            correct.push(`${id}.0`)
          }
          if (strcmp(title, song.title) < typoTolerance) {
            points += 1;
            correct.push(`${id}.1`)
          }
        }
      })
    });
    const username = socket.username;
    socket.emit('correction', correct);
    scores.push({ username, points });
  });

  socket.on('getScores', () => {
    console.log(scores);
    io.emit('setScores', scores)
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