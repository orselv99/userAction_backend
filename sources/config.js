const fs = require('fs');
var data = fs.readFileSync('./servers/config.json', 'utf8');    // entry 가 기준
var info = JSON.parse(data);

exports.getServerConfig = (name) => {
    let ip = "";
    let port = 0;

    for (let i = 0; i < info.server.length; i++) {
        if (info.server[i].name === name) {
            ip = info.server[i].ip;
            port = info.server[i].port;
            //console.log(`${ip}:${port}`);
            break;
        }
    }

    return { ip, port };
}

// TODO: 정책생성 오류시 기본값 처리