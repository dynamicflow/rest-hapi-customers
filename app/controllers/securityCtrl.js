const Boom 		= require('boom');
const md5		= require('md5');
var db			= require('../database');

exports.checkToken = function (token, callback) {
	db.pool.query('SELECT * from tokens where token=?',token,
	function(err, rows, fields) {				
		if (rows !== undefined && rows.length > 0) {
			callback(null, true, rows[0]);
	    }
	    else {
	    	console.log("invalid token: ",token, rows)
	        callback(null, false, null);
	    }
	});	
};

exports.login = function(request, reply) {
	console.log("login", request.payload.username);
	var d = Date.now();
	var r = Math.random();
	var token = {
		token: md5(d+r+request.payload.username),
		user: request.payload.username,
		scope: 'user'
	}
	db.pool.query("INSERT INTO tokens SET ?", token, 
		function(err, res) {
			if (err) throw err;    			
			reply({
				token: token
			});    				
		}
	) ; 
};

exports.logout = function(request, reply) {
	var token = request.headers.authorization.match(/([\d\w]{32})/)[1];
	console.log("logout",token);
	
	if (token) {
		db.pool.query("DELETE FROM tokens WHERE token=?", token, 
			function(err, res) {
				if (err) throw err;    			
				reply();				
			}
		); 		
	} else {
		reply(Boom.badRequest());
	}
};