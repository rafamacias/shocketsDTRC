'use strict';
var nodemailer  = require('nodemailer');
var Helpers = rootRequire('app/helpers');
var config = rootRequire('config');
var logger = new Helpers().logger;
var emailConfig = config.email;
var isDev = (config.env === 'DEV');
var className = 'EMAIL CLASS';  //DEBUG purposes
/**
*   Class EmailSender
*   
* 
*/
class Email {

    constructor () {
        this._transporter = nodemailer.createTransport(emailConfig.server);

        this.mailOptions = {
            from: emailConfig.from,
            subject: emailConfig.subject,
            text: emailConfig.defaultText,
            html: emailConfig.defaultText
        };
    }

    send (options, callback) {
        // The own configuration for nodeMailer
        this.mailOptions.to         = options.to || '';
        this.mailOptions.subject    = options.subject || '';
        this.mailOptions.html       = options.body || '';
        this.mailOptions.text       = options.plaiText || '';

// TODO: check that addresses is an string of addresses separated by commas
// like: 'asd@example.com, info@exmp.com'
        if(options.to) {

            ///This will not send the message to the emails in DEV environment
            // Please remove/change for email testing purposes
            if(!isDev) {
                
                setTimeout(function() {
                    if(Math.random().toString().search('3333') != -1) { //An error that could occur sometimes
                        var err = new Error('FUCKKKKKKKKKKKKKKK An error');
                        logger.error('Error happened: ' + err);
                        return callback(err);
                    }

                    logger.log('FAKE EMAIL.EMAIL SENT TO :' + options.to);
                    callback(null, {response: 'fakeSent'});
                }, 500);

                return;
            }

            return this._transporter.sendMail(this.mailOptions, function(err, info){
                if (err) {
                    logger.error(err, className);
                    return callback(err);
                }
                logger.log('Message sent: ' + info.response, className);
                logger.log(options.to);

                callback(null, info);
            });

        } else {
            logger.warn('There was not address to send', className);
        }
    }
}

module.exports = Email;
