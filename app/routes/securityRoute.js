const joi 		  = require('joi');
var securityCtrl  = require('../controllers/securityCtrl');

module.exports = [ 
	{
		method : 'GET',
		path : '/security/token',
		handler : function(request,reply) {
			console.log('security/token');
			reply();
		}
	},
	{ 
		method : 'POST',
		path : '/security/login',
		handler : securityCtrl.login,
		config: {
	        validate: {
	            payload: {
	                username: joi.string().email().required(),
	                password: joi.string().min(8).required()	                
	            }
	        },
	        auth: false
	    }
	}, {
		method : 'POST',
		path : '/security/logout',
		handler : securityCtrl.logout,
		config: {
	        auth: {
	            strategy: 'bearer',
	            scope: 'user' // or 'admin'
	        }
		}
	}
];