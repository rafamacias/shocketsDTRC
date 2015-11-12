'use strict';
var Helpers = rootRequire('app/helpers');
var helpers = new Helpers();
var logger = helpers.logger;
var config = rootRequire('config');
var CustomerRepository = rootRequire('app/models/customer');
var PushNotifications = rootRequire('app/services/pushNotifications');


/**
 * MainService
 * @name MainService
 * @description
 */
class MainService {
	constructor () {
		this.notifications = new PushNotifications();
		this.customerRepository = new CustomerRepository();
	}

	processData (data) {
		if (data.formMappingId && data.journeyId && data.value) {

			let that = this;
			
			if(data.uId) {
				setTimeout( function() {

					let messageInfo = that.customerRepository.getAgentInfoByJourneyId(data.journeyId);
					messageInfo.url = data.value;

					let userId = data.notificationsId;
					that.notifications.send(userId, messageInfo)
					logger.log('sending message');

				}, config.push.delayToSend);
			}

			return `Info captured: ${data.value}`;;
		} else {
			logger.log(data);
			return 'No Data captured';;
		}
	}

	
}
module.exports = MainService;