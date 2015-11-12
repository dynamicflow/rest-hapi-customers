const joi 		= require('joi');
var controller  = require('./controller');

module.exports = { 
	customer: [ 
	    {
	    	method : 'GET',
	    	path : '/customers',
	    	handler : controller.getAll,
	    	config: {
	            validate: {
	                params: {
	                    limit: joi.number().integer().min(1).max(1000).default(100),
	                    offset: joi.number().integer().min(0).default(0)
	                }
	            },
	            auth: {
	                strategy: 'bearer',
	                scope: 'user' // or 'admin'
	            }
	        }
	    }, {
	    	method : 'GET',
	    	path : '/customers/{id}',
	    	handler : controller.getById,
	    	config: {
	            validate: {
	                params: {
	                    id: joi.number().integer()
	                }
	            },
	            auth: {
	                strategy: 'bearer',
	                scope: 'user' // or 'admin'
	            }
	        }	
	    }, { 
	    	method : 'POST',
	    	path : '/customers',
	    	handler : controller.save,
	    	config: {
	            validate: {
	                payload: {
	                    name: joi.string().min(3).max(100).required(),
	                    email: joi.string().email().optional(),
	                    address1: joi.string().max(100).required(),
	                    address2: joi.string().max(100).optional(),
	                    city: joi.string().max(100).required(),
	                    state: joi.string().min(2).max(2).required(),
	                    country: joi.string().min(2).max(2).required(),
	                    latitude: joi.number().optional(),
	                    longitude: joi.number().optional(),
	                }
	            },
	            auth: {
	                strategy: 'bearer',
	                scope: 'user' // or 'admin'
	            }
	        }
	    }, {
	    	method : 'PUT',
	    	path : '/customers/{id}',
	    	handler : controller.save,
	    	config: {
	    	    validate: {
	    	        payload: {
	                    name: joi.string().min(3).max(100).optional(),
	                    email: joi.string().email().optional(),
	                    address1: joi.string().max(100).optional(),
	                    address2: joi.string().max(100).optional(),
	                    city: joi.string().max(100).optional(),
	                    state: joi.string().min(2).max(2).optional(),
	                    country: joi.string().min(2).max(2).optional(),
	                    latitude: joi.number().optional(),
	                    longitude: joi.number().optional()
	    	        },
	                params: {
	                    id: joi.number().integer()
	                }
	            },
	            auth: {
	                strategy: 'bearer',
	                scope: 'user' // or 'admin'
	            }
	    	}
	    }, {
	    	method : 'DELETE',
	    	path : '/customers/{id}',
	    	handler : controller.remove,
	    	config: {
	    	    validate: {	       
	                params: {
	                    id: joi.number().integer()
	                }
	            },
	            auth: {
	                strategy: 'bearer',
	                scope: 'user' // or 'admin'
	            }
	    	}
	    }
    ]	
}