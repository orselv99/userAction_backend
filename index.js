const config = require('./servers/config');
const admin = require('./servers/admin');
const client = require('./servers/socket');

admin(config);
client(config);