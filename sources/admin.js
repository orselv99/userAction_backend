module.exports = (config) => {
    const serverConfig = config.getServerConfig('http');
    const express = require('express');
    const listener = express();
    const http = require('http');

    listener.get('/', (request, response) => {
        response.send('Someone is connected!');
        // 일단, html 로 정책입력쪽 만들기 >> react.js 로 변경
    });
    listener.put('/something1', (request, response) => {
        //
    });
    listener.post('/something2', (request, response) => {
        //
    });
    listener.delete('/something3', (request, response) => {
        //
    });

    http.createServer(listener).listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
}