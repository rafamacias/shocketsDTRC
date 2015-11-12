'use strict';
var Helpers = rootRequire('app/helpers');
var helpers = new Helpers();
var logger = helpers.logger;
var config = rootRequire('config');


/**
 * CustomerRepository
 * @name CustomerRepository
 * @description
 */
class CustomerRepository {
	constructor () {}

	getAgentInfoByJourneyId (journeyId) {
		let defaultInfo = {
			logo: '',
			title : 'Here is your notification',
			text : 'Want to see your basket, CLICK on the link now!'
		}

		switch (journeyId) {

			case 9519:
				defaultInfo.text = 'apps.vejapan.com: ' + defaultInfo.text;
				return defaultInfo;
				break;

			default:
				return defaultInfo;
		}

	}
	
}
module.exports = CustomerRepository;