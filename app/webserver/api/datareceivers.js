'use strict';
var Helpers = rootRequire('app/helpers');
var helpers = new Helpers();
var logger = helpers.logger;
var config = rootRequire('config');

var MainService = rootRequire('app/services/mainService');

/**
 * Datareceivers
 * @name Datareceivers
 * @description
 */
class Datareceivers {
	constructor (app, router) {
		this.path = '/datareceivers';
		this.app = app;
		this.router = router;
		this.mainService = new MainService();
	}

	init () {

		//TODO: the function is not done!!! move to a helper function
		function urlIsWhiteInWhiteList(url) {
			return true;
		}


		let that = this;
		this.router.route(this.path)

			.get(function (req, res) {
				// TODO: Check for IE that doesn't send headers.origin
				if(urlIsWhiteInWhiteList(req.headers.origin)) {
					res.set('Access-Control-Allow-Origin', req.headers.origin);
				}

				res.json({ message : that.mainService.processData(req.query)} );
			})

			.post(function(req, res) {
				logger.log(req);
				res.json({ message : that.mainService.processData(req.body)} );
			});


		let apiConfig = config.api;
		this.app.use(apiConfig.url + apiConfig.version, this.router);
	}
}
module.exports = Datareceivers;