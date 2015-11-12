const Boom 		= require('boom');
var db			= require('../database');

exports.getAll = function(request, reply) {
	console.log(request.auth.credentials.user,"getAll", 'limit:',request.params.limit,'offset:',request.params.offset);

	db.pool.query("SELECT * FROM customers LIMIT ? OFFSET ?", [
		request.params.limit,
		request.params.offset
	], function(err, rows, fields) {
		if (err) throw err;
		
		if (rows !== undefined && rows.length > 0) {          				
			reply(rows);
		} else {
			reply([]);
		}
	});
};	

exports.getById = function(request, reply) {
	console.log("getById", request.params.id);
	
	db.pool.query("SELECT * FROM customers WHERE id=?", request.params.id,
	function(err, rows, fields) {
		if (rows !== undefined && rows.length > 0) {
			reply(rows[0]);
		} else {
			return reply(Boom.notFound());
		}
			
	});	
};

exports.save = function(request, reply) {
	console.log("save", request.payload);
	
	if (request.method == 'put') { 
		delete request.payload.id;		
		db.pool.query("UPDATE customers SET ? WHERE id=?", [request.payload, request.params.id],
			function(err, res) {
			if (err) throw err;    			
			reply();    				
		});
	} else {
		db.pool.query("INSERT INTO customers SET ?", request.payload, 
			function(err, res) {
			if (err) throw err;    			
			reply().created('/customers/'+res.insertId);    				
		}) ; 
	}
};

exports.remove = function(request, reply) {
	console.log("remove",request.params.id);  
	
	db.pool.query("DELETE FROM customers WHERE id=?", request.params.id,
	function(err, res) {
		if (err) throw err;
		
		if (res.affectedRows==0) {
			reply(Boom.notFound())
		}
		
		reply();    				
	});
}
