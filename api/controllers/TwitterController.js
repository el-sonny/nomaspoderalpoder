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

function addData(t,i){
	if(t.text){
		t.text = replaceMentions(replaceHashTags(replaceURLWithHTMLLinks(t.text)));
		t.time = new Date(t.created_at);
		if(!isFinite(i)){//stream
			tweets.unshift(t);
			tweets.pop();
			newTweets(t);
		}else{//search
			tweets.push(t);
		}	
	}
}
function replaceURLWithHTMLLinks(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp,"<a href='$1'>$1</a>"); 
}
function replaceHashTags(text) {
	var exp = /#(\S*)/ig;
	return text.replace(exp,"<a href='http://twitter.com/#!/search/$1'>#$1</a>"); 
}
function replaceMentions(text) {
	var exp = /@(\w{3,})/ig;
	return text.replace(exp,"<a href='http://twitter.com/$1'>@$1</a>"); 
}

twit.stream('statuses/filter', {track:'nomaspoderalpoder, nomaspoderapp'},function(stream) {
	stream.on('data', addData);
});

twit.search('#nomaspoderalpoder OR #nomaspoderapp', function(data){
	data.statuses.forEach(addData);
});
