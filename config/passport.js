var passport = require('passport')
, Twitter = require('passport-twitter').Strategy
, config = require('./local');
passport.use(new Twitter(config.twitter_passport_keys,function(token,tokenSecret,profile,done){
	var user = {
		 token:token
		,tokenSecret:tokenSecret
		,profile:profile
	}
	done(null,user);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
   
passport.deserializeUser(function(id, done) {
	done(null,id);
});

module.exports = {
	express:{
		customMiddleware: function(app){
			app.use(passport.initialize());
			app.use(passport.session());
		}

	}
};
