'use strict';
var Helpers = rootRequire('app/helpers');
var helpers = new Helpers();
var logger = helpers.logger;
var config = rootRequire('config');
var Datareceivers = require('./datareceivers')

/**
 * Api
 * @name Api
 * @description
 */
class Api {
	constructor (app, router) {
		this.app = app;
		this.router = router;
	}

	init () {

		// middleware to use for all requests
		this.router.use(function(req, res, next) {
  			// .. some logic here .. like any other middleware

  			    logger.log(`${req.method} API call to ${req.hostname}${req.path} from ${req.ip}`);

  			next();
		});

		let datareceivers = new Datareceivers(this.app, this.router);
		datareceivers.init();


		// this.router.route('/users')

		// 	.post(function(req, res) {

		// 		logger.log(req.body, 'THE BODY IS ');

		// 		thisToChange.users.addUser(req.body, (err) => {
		// 			if (err) return res.send(err);

		// 			res.json({ message: 'User Added' });

		// 			//TODO: Add this functionality so the currency is added on runtime
		// 			//thisToChange.currencies.add(user.currency);
		// 		});				
		// 	})

		// 	.get(function (req, res) {

		// 		thisToChange.users.getAll(function(err, users) {
		// 			if (err) res.send(err);


		// 	  		//TODO: Move this from here to the confirmation email receiver.
		// 			io.emit('user:confirmation', 'rafa');
		// 			res.json(users);
		// 		});
		// 	});

		let apiConfig = config.api;
		this.app.use(apiConfig.url + apiConfig.version, this.router);
	}
}
module.exports = Api;