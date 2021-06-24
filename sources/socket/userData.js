module.exports = (config) => {
    const serverConfig = config.getServerConfig('tcp');
    const net = require('net');
    const server = net.createServer();
    const fs = require('fs');
    const path = require("path");

    // TODO: 저 debug 로그들 함수형태로 정리해보자

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
                        let result = fs.readFileSync(path.resolve(__dirname, 'latestRule.json'));
                        socket.write(result);
                        break;
                    case 1:
                        console.log('request upload user data.');
                        // TODO: 클라이언트에서 전달해온 데이터를 파일로 저장
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