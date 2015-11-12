/*
 */
var Hapi 		= require('hapi');
var BearerAuth 	= require('hapi-auth-bearer-simple');

var routes		= require('./routes');
var controller	= require('./controller');
var config		= require('../conf/dev.js');

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
        validateFunction: controller.checkToken
    }); 
    
    server.route(routes.customer);

    server.start(function() {
    	console.log('Server running at:', server.info.uri);
    });
});


