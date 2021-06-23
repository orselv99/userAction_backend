const config = require('./sources/config');
const rule = require('./sources/http/rule');
const client = require('./sources/socket/userData');

//rule(config);
client(config);
