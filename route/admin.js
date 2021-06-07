var exports = module.exports = {};
const express = require('express');
const requestListener = express();

exports.getABC = () => {
    return 'Someone connected!';
};