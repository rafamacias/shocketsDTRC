'use strict'

var config = {};

config.env = 'DEV';

config.webserver = {
	port: 3000,
	paths: {
		static: 'public',
		views: 'app/views'
	},
	templateTags :['<?=', '?>']
};

config.db = {
	name: 'mongodb://localhost/test'
};

config.api = {
	url: '/api/v',
	version : '1'
};

config.push = {
	delayToSend : 1000 * 5
}

module.exports = config;
