//require('ilink.js').reg(module,'LiSA.sync')

var adapter = require('lisa.sync.fileadapter')

exports.getId= adapter.getId
exports.syncReader= adapter.syncReader
exports.reader = adapter.reader
exports.writer =  adapter.writer