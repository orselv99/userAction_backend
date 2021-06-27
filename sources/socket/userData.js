const { exception } = require('console');
const { RULEPATH } = require('../http/rule/rule');

module.exports = (config) => {
    const serverConfig = config.getServerConfig('tcp');
    const net = require('net');
    const server = net.createServer();
    const fs = require('fs');
    const path = require("path");



    server.listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
    server.on('connection', (socket) => {
        console.log('Someone is connected.');
        socket.on('data', (data) => {
            console.log(`${data}`);

            try {
                const request = JSON.parse(data);
                switch (request.id) {
                    case 0:
                        console.log('request download rule.');

                        // 생성된 최근정책을 읽어서 전달
                        let result = fs.readFileSync(RULEPATH);
                        socket.write(result);
                        break;
                    case 1:
                        console.log('request upload user data.');
                        // TODO: 클라이언트에서 전달해온 데이터를 파일로 저장
                        if (request.param == null) {
                            throw exception('Request parameter is null.');
                        }

                        // request data 형태
                        // 사용자이름으로 unique 한 파일명
                        // 파일크기
                        // 실제 데이터
                        break;
                }
            }
            catch (error) {
                //
                console.log(`err: ${error}`);
                socket.write(JSON.stringify(result));
            }
        });
        socket.on('end', () => {
            console.log('request end.');
        });
        socket.on('error', (error) => {
            console.log(`err: ${error}`);
        });
    });
    server.on('close', (socket) => {
        console.log('Socket Server (TCP) is closed.');
    });
    server.on('error', (error) => {
        console.log('on Error');
    });
};