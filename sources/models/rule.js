const mongoose = require('mongoose');

// https://mongoosejs.com/docs/schematypes.html
const schema = new mongoose.Schema({
    interval: { type: Number, default: 250 },
    features: {
        afk: {
            enabled: { type: Boolean, default: true },
            in: { type: Number, default: 10 * 60 * 1000 },  // 10분
            awake: { type: Number, default: 5 * 1000 }      // 5초
        },
        process: {
            enabled: { type: Boolean, default: true },
            excludes: [String],
            privates: [String],
            browsers: [String],
            duplicates: [String]
        },
        fileIo: {
            enabled: { type: Boolean, default: true },
            excludes: [String],
            extensions: [String]
        },
        print: {
            enabled: { type: Boolean, default: true }
        }
    }
});

module.exports = mongoose.model('rule', schema);