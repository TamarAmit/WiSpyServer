var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var udpServer = require('./udpServer');


var PORT = 4012;
// var HOST = '0.0.0.0';
var HOST = '10.20.20.114';

var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');

udpServer.on('listening', function() {
    var address = udpServer.address();
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

udpServer.on('message', function(message, remote) {
    // console.log('aaaaa');
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

udpServer.bind(PORT, HOST);


io.on('connection', function(socket){
    console.log('a user connected');
});


http.listen(3030, function(){
    console.log('listening on *:3030');
});


io.on('message', function(message, remote) {
    // console.log('aaaaa');
    // const parsed = {msg: message};
    // io.sockets.emit('broadcast', parsed);
    // sendMsg(message);
    console.log(remote.address + ':' + remote.port +' - ' + message);
    // console.log('msg rcv');

});

udpServer.on('message', function(message, remote) {
    var msg = new TextDecoder().decode(message);
    sendMsg(msg.replace(/\n/g,''));
    // io.sockets.emit('message', message);

    console.log(remote.address + ':' + remote.port +' - ' + message);
    console.log('msg rcv');
});


function sendMsg(msg){
    const parsed = {grade: msg, ts: Date.now()};
    io.sockets.emit('message', parsed);
    console.log('msg sent');
}

//
// function intervalSend() {
//     setInterval(function () {
//         io.sockets.emit('message', );
//
//     },500);
// };
//
// intervalSend();

