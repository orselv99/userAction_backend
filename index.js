const config = require('./sources/config');
const admin = require('./sources/rule');
const client = require('./sources/socket');

admin(config);
client(config);