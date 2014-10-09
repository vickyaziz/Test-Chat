var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// this message to load the index.html page 
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// when a connection is opened with socket
io.on('connection', function(socket){
  // logging a message saying that a user is connected
  console.log('a user connected');

  // when a connection is closed with socket
  socket.on('disconnect', function(){
    // logging a message saying that a user is disconnected
    console.log('user disconnected');
  });
  // on receiving a message to function "chat message"
  socket.on('chat message', function(msg){
    // send the message to all connected users
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});