var config= require('../conf/dev');
var mysql = require('mysql');
var pool  = mysql.createPool(config.database);

exports.pool = pool;