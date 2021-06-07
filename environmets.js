var exports = module.exports = {};

const fs = require('fs');
var jsonData = fs.readFileSync('.\\const.json', 'utf8');
var jsonInfo = JSON.parse(jsonData);
var ip = "";
var port = 0;

exports.getServerInfo = (name) => {
    let ip = "";
    let port = 0;

    for (let i = 0; i < jsonInfo.server.length; i++) {
        if (jsonInfo.server[i].name === name) {
            ip = jsonInfo.server[i].ip;
            port = jsonInfo.server[i].port;
            console.log(`${jsonInfo.server[i].ip}:${jsonInfo.server[i].port}`);
            break;
        }
    }

    return { ip, port };
}
