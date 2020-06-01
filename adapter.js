//require('ilink.js').reg(module,'LiSA.sync')

var adapter = require('./fileAdapter')

exports.getId= adapter.getId
exports.syncReader= adapter.syncReader
exports.reader = adapter.reader
exports.writer =  adapter.writer