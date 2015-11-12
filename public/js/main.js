import angularDependencies from './vendor';

import config from './config/config';

import WebSocket from './websocket';


angular.element(document).ready(function() {

	let body = document.getElementsByTagName("body")[0];

	let dependencies = angularDependencies.concat([
	]);

	console.log(WebSocket.name);

	let app = angular.module(config.appName, dependencies)
		.config(config.routerConfig)
		.constant('configConstant', config.constant)
		.service(WebSocket.name, WebSocket);

	angular.bootstrap(body, [app.name], { strictDi: true });
});
