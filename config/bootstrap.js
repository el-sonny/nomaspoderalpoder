/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

	/*esto no funciona
	if (process.env.NODE_ENV == 'development') {
		process.env.MONGO_HOST = 'mongodb://localhost:27017'
		process.env.APP_PORT = '1339';
	}*/
  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  	TwitterMassive.init();
	cb();
};
