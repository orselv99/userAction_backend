var dgram = require('dgram');
var ip = 'localhost';
var port = '30002';
var socket = new dgram.Socket();
socket.connect({ host: ip, port: port }, () => {
    console.log('Success to connect');
    socket.write('It\'s me!');
    socket.end();

    socket.on('data', (chunk) => {
        console.log(`received: ${chunk.toString()}`);
    });
    socket.on('end', (chunk) => {
        console.log('end of connection');
    });
});