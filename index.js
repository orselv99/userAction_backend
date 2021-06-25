const config = require('./sources/config');
const rule = require('./sources/http/rule');
const client = require('./sources/socket/userData');

rule(config);   // 정책 페이지
client(config); // 사용자 client <<>> server
