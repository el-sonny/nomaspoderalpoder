/**
 * TwitterController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var twitter = require('twitter')
, twit = new twitter({
      consumer_key: '0Sa9hnn71aOathJ1LeN9ChCvw'
    , consumer_secret: 'BAX67jaV2RcCqxEbhjIQj2Y8WkKsVEMZ4yRWugSwAOkGsgNveC'
    , access_token_key: '599751421-kc2t8IfmRXTh8LhSjFIpVRiHY4iz3bGs1HOghbhp'
    , access_token_secret: 'UzPEQ8HypQBGixE7uYOn85gLiInVZJoiFFMAWyMYxjEUf'
})
, tweets = []
, clients = [];
module.exports = {
	tweets : function(req,res){
		res.json(tweets);	
		req.socket.on('disconnect',function(){
			clients.splice(req.socket,1)
		});

		clients.push(req.socket);
	}
};

function newTweets(data){
	clients.forEach(function(e){
		e.emit('newTweet',data);
	});
}

twit.stream('statuses/filter', {track:'nomaspoderalpoder, nomaspoderapp'},function(stream) {
    stream.on('data', function(data) {
        if(data.text){
		data.time = new Date(data.created_at);
		newTweets(data);
		tweets.unshift(data);
		tweets.pop();
	}
		
    });
});

twit.search('#nomaspoderalpoder OR #nomaspoderapp', function(data) {
    data.statuses.forEach(function(e,i){
	if(e.text){
		e.time = new Date(e.created_at);
		tweets.push(e);
	}
    });
});
