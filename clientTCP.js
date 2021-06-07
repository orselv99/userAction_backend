// 환경설정
const env = require('./environmets');
const info = env.getServerInfo('tcp');

// 서버
const net = require('net');
var socket = new net.Socket();

// 에러
socket.on('error', (exception) => {
    console.log(`name: ${exception.name}`);
    console.log(`message: ${exception.message}`);
});

// 연결시도
socket.connect({ host: info.ip, port: info.port }, () => {
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