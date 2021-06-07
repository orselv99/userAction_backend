// 환경설정
const env = require('./environmets');
const admin = env.getServerInfo('http');

/////// 1. 관리자 화면과 서버에 데이터 적재하는 것은 http 통신
const express = require('express');     // express
const http = require('http');           // admin page 용
const requestListener = express();
const adminPort = admin.port;
const adminServer = http.createServer(requestListener);

// REST API 라우팅
const route = require('./route/admin');
requestListener.get('/', (request, response) => {
    response.send(route.getABC());
});
adminServer.listen(adminPort, () => {
    console.log('Web-server is running now.');
});

/////// 2. 사용자 클라이언트에서 받을 데이터는 tcp 소켓 통신
const tcp = env.getServerInfo('tcp');
const net = require('net');             // tcp (net), 
const tcpPort = tcp.port;
const tcpServer = net.createServer((socket) => {
    socket.write('Welcome to Socket Server');
    socket.on('data', (chunk) => {
        console.log(`received: ${chunk.toString()}`);
    });
    socket.on('end', () => {
        console.log('end of connection');
    });
});
tcpServer.on('close', () => {
    console.log('Server is closed.');
});
tcpServer.listen(tcpPort, () => {
    console.log('Socket-server(TCP) is running now.');
});

/////// 3. 사용자 클라이언트에서 받을 데이터는 udp 소켓 통신
const udp = env.getServerInfo('udp');
const dgram = require('dgram');
const udpPort = udp.port;
const udpServer = dgram.createSocket('udp4');
udpServer.bind(udpPort);
udpServer.on('listening', () => {
    console.log('Socket-server(UDP) is running now.');
});
udpServer.on('message', () => {
    console.log('udp message');
});
udpServer.on('close', () => {
    console.log('udp close');
});