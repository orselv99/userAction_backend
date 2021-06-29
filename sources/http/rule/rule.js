const path = require('path');

function storeRule() {
    alert('Clicked!');
}

exports.RULEPATH = require('path').resolve(__dirname, 'rule.json');
module.exports = (config) => {
    // server
    const serverConfig = config.getServerConfig('http');
    const express = require('express');
    const listener = express();
    const http = require('http');
    const fs = require('fs');
    const cors = require('cors');
    listener.use(cors());

    listener.get('/admin', (request, response) => {
        response.writeHead(200, { "Context-Type": "text/html" });
        fs.createReadStream(path.resolve(__dirname, 'rule.html')).pipe(response);
    });
    listener.put('/storeRule', (request, response) => {
        response.send('something1-OK');
    });
    listener.get('/getRule', (request, response) => {
        console.log(`request: ${request.ip}`);
        const data = fs.readFileSync(this.RULEPATH);
        response.json(JSON.parse(data));
    });
    listener.delete('/something3', (request, response) => {
        response.send('delete something3');
        return;
    });

    http.createServer(listener).listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
}