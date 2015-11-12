'use strict';
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

var config = require('./config');
var WebServer = require('./app/webserver');
var Helpers = require('./app/helpers');


// Start the server
let webserver = new WebServer(config.webserver,	config.db);
webserver.init(function () {
	let logger = new Helpers().logger;

   	logger.log(`Web Server started`);
});
