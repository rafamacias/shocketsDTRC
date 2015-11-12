'use strict';
var Helpers = rootRequire('app/helpers');
var helpers = new Helpers();
var logger = helpers.logger;
var config = rootRequire('config');

/**
 * PushNotifications
 * @name PushNotifications
 * @description
 */
class PushNotifications {
	constructor () {}

	send(userId, messageInfo) {
		let title = messageInfo.title;
		let url = messageInfo.url;
		let text = messageInfo.text;
	}

}
module.exports = PushNotifications;