const path = require('path');

module.exports = (config) => {
    // // db
    // const db = require('mongoose');
    // const uri = config.getDBConfig('mongo1').connectString;
    // db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    //     if (error) {
    //         console.log(error);
    //         return;
    //     }
    //     console.log(`Connect to database! uri: ${uri}`);
    // });
    // // rule
    // const rule = require('../models/rule');
    // server
    const serverConfig = config.getServerConfig('http');
    const express = require('express');
    const listener = express();
    const http = require('http');
    const fs = require('fs');

    listener.get('/admin', (request, response) => {
        console.log('Someone is connected!');
        response.writeHead(200, { "Context-Type": "text/html" });
        fs.createReadStream(path.resolve(__dirname, 'rule.html')).pipe(response);
        // 일단, html 로 정책입력쪽 만들기 >> react.js 로 변경
    });
    listener.put('/something1', (request, response) => {
        //
        rule.find((error, data) => {
            if (error) {
                console.log(error);
                return;
            }

            response.send(data);
            return;
        });
    });
    listener.post('/something2', (request, response) => {
        response.send('post something2');
        return;
    });
    listener.delete('/something3', (request, response) => {
        response.send('delete something3');
        return;
    });

    http.createServer(listener).listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
}

exports.RULEPATH = require('path').resolve(__dirname, 'rule.json');