var config	= require('../conf/config.json')[process.env.NODE_ENV || 'dev'];
var mysql 	= require('mysql');
var pool  	= mysql.createPool(config.database);

exports.pool = pool;