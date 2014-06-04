var twitter = require('twitter');

module.exports.init = function(){
	loadAllInDB();
	setInterval(function(){
		loadAllInDB();
	},1200000);//reload all 20 m
}

function loadAllInDB(){
	Tweet.find().exec(function(err,tweet){
		if(err) return err;
		tweet.forEach(function(i){
			makeTweets(i);
		});
	});
}

function makeTweets(user){
	var interval = setInterval(function(){
		if(user.tweetsTo.length){
			var to = user.tweetsTo.pop();
			publicTweet(user.tokens_keys,to.twitter,user.tweet,function(err){
				if(err) return clearInterval(interval);
				Tweet.update({id:user.id},{tweetsTo:user.tweetsTo}).exec(function(err,tw){
					if(err) return console.log('errorrrrUpdate')
				});
			});
		}else{
			console.log('listo')
			clearInterval(interval);
		}
	},3000);

}

function publicTweet(keys,to,txt,cb){
	var tw = new twitter({
		  consumer_key: sails.config.twitter_passport_keys.consumerKey
		, consumer_secret: sails.config.twitter_passport_keys.consumerSecret
		, access_token_key: keys.access_token_key
		, access_token_secret: keys.access_token_secret
	});

	tw.verifyCredentials(function(data){
		if(!(data && data.name))
			cb(true);
	}).updateStatus('@'+to+' '+txt,function(data){
		console.log('tweet a'+to);
		cb(false);
	}).rateLimitStatus(function(){//error
		console.log('limit')
		cb(true);
	});

}
