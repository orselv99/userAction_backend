const fs = require('fs');
const data = fs.readFileSync('./sources/config.json', 'utf8');    // entry 가 기준
const info = JSON.parse(data);

exports.getServerConfig = (name) => {
    let result = {
        ip: '',
        port: 0
    };

    for (let i = 0; i < info.server.length; i++) {
        if (info.server[i].name === name) {
            result.ip = info.server[i].ip;
            result.port = info.server[i].port;
            break;
        }
    }

    return result;
}

exports.getDBConfig = (name) => {
    let result = {
        user: '',
        password: '',
        connectString: ''
    };

    for (let i = 0; i < info.db.length; i++) {
        if (info.db[i].name === name) {
            result.user = info.db[i].user;
            result.password = info.db[i].password;
            result.connectString = info.db[i].connectString;
        }
    }

    return result;
}

// TODO: 정책생성 오류시 기본값 처리