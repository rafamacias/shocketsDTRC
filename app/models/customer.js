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
		let info = {
			logo: '',
			title : 'Here is your notification',
			text : 'Want to see your basket, CLICK on the link now!'
		}

		switch (journeyId) {

			case 9519:
				info.text = 'apps.vejapan.com: ' + info.text;
				return info;
				break;

			default:
				return info;
		}

	}
	
}
module.exports = CustomerRepository;