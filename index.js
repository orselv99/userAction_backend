const express = require('express');     // express
const http = require('http');           // admin page 용
const app = express();
const server = http.createServer(app);
const fs = require('fs');
const rule = fs.readFileSync('./rule.json', 'utf8');

app.get('/', (request, response) => {
    response.send('Someone connected!');
});

server.on('connection', (socket) => {
    console.log(`${socket.remoteAddress}:${socket.remotePort} is connected!`);
    
    socket.on('data', chunk => {
        console.log('data!');
    });
    socket.on('end', chunk => {
        console.log('data end!');
    });
    socket.on('close', (socket) => {
        console.log('socket is closed!');
    });
});

server.listen(3000, () => {
    let ruleObject = JSON.parse(rule);
    console.log(ruleObject.interval);
    console.log(ruleObject.features.idle.enabled);


    console.log('Server is running now.');
});