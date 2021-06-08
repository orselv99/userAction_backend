module.exports = (config) => {
    const serverConfig = config.getServerConfig('tcp');
    const net = require('net');
    const server = net.createServer();

    server.listen(serverConfig.port, () => {
        console.log(`${serverConfig.ip}:${serverConfig.port} is running.`);
    });
    server.on('connection', (socket) => {
        console.log('Someone is connected.');
        socket.on('data', (data) => {

        });
        socket.on('end', () => {

        });
        socket.on('error', (error) => {
            console.log('on Error');
        });
    });
    server.on('close', (socket) => {
        console.log('Socket Server (TCP) is closed.');
    });
    server.on('error', (error) => {
        console.log('on Error');
    });
};