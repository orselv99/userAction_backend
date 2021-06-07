module.exports = (config) => {
    // db
    const db = require('mongoose');
    const uri = config.getDBConfig('mongo1').connectString;
    db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(`Connect to database! uri: ${uri}`);
    });
    const rule = require('./models/rule');

    //
    const serverConfig = config.getServerConfig('http');
    const express = require('express');
    const listener = express();
    const http = require('http');

    listener.get('/', (request, response) => {
        console.log('Someone is connected!');
        rule.find((error, data) => {
            if (error) {
                console.log(error);
                return;
            }

            response.send(data);
        });

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