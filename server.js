var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3000;
var n1=0;
var n2=0;
server.listen(port);

app.use(express.static('static'));
app.get('/socket.io.js', function(req,res){
  res.sendFile(__dirname+'/node_modules/socket.io-client/dist/socket.io.js');
});

io.on('connection', function(socket){
  socket.on('goal',function(msg){
    if(msg == '1'){n1++;}
    if(msg == '2'){n2++;}
    io.emit('n1',n1);
    io.emit('n2',n2);
    console.log(n1,n2);
  });
  socket.on('XX', function(msg){
    console.log('XX: ' + msg);
    socket.broadcast.emit('XX1',msg);
  });
  socket.on('YY', function(msg){
    console.log('YY: ' + msg);
    socket.broadcast.emit('YY1',msg);
  });
  socket.on('AA', function(msg){
    console.log('AA: ' + msg);
    socket.broadcast.emit('AA1',msg);
  });
  socket.on('PP', function(msg){
    console.log('PP: ' + msg);
    socket.broadcast.emit('PP1',msg);
    setTimeout(()=>{socket.broadcast.emit('PP1','0')},2500);
  });
});
