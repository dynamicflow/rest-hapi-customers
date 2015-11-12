/*
 */
var Hapi 		= require('hapi');
var BearerAuth 	= require('hapi-auth-bearer-simple');

var config		= require('../conf/config.json')[process.env.NODE_ENV || 'dev'];
var routes		= require('./routes');
var securityCtrl	= require('./controllers/securityCtrl');

var server = new Hapi.Server({
	debug : {
		request : [ 'error' ]
	}
});

server.connection(config.server)

server.register(BearerAuth,function(err){
    if (err) {
        throw err;
    }
    
    server.auth.strategy('bearer', 'bearerAuth', true, {
        validateFunction: securityCtrl.checkToken
    }); 
        
    server.route(routes.customersRoute);
    server.route(routes.securityRoute);
    
    server.start(function() {
    	console.log('Server running at:', server.info.uri);
    });
});


