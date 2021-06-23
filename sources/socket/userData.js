module.exports = (config) => {
    const serverConfig = config.getServerConfig('tcp');
    const net = require('net');
    const server = net.createServer();

    // TODO: 저 debug 로그들 함수형태로 정리해보자

    server.listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
    server.on('connection', (socket) => {
        console.log(`${Date.now()}: Someone is connected.`);
        socket.on('data', (data) => {
            console.log(`${data}`);
            
            try {
                const request = JSON.parse(data);
                switch (request.id) {
                    case 0:
                        console.log(`${Date.now()}: request download rule.`);
                        // TODO: 정책설정 페이지에서 만들어진 json data 를 읽어서 클라이언트에 return
                        const result = {
                            result: true
                        };
                        socket.write(JSON.stringify(result));
                        break;
                    case 1:
                        console.log(`${Date.now()}: request upload user data.'`);
                        // TODO: 클라이언트에서 전달해온 데이터를 파일로 저장
                        break;
                }
            } 
            catch (error) {
                console.log(`${Date.now()}: ${error}`);
            }
        });
        socket.on('end', () => {
            console.log(`${Date.now()}: request end.`);
        });
        socket.on('error', (error) => {
            console.log(`${Date.now()}: ${error}`);
        });
    });
    server.on('close', (socket) => {
        console.log('Socket Server (TCP) is closed.');
    });
    server.on('error', (error) => {
        console.log('on Error');
    });
};