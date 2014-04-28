/**
 * TwitterController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var config;
try {
	config = require('../../config/local.js');
}catch(e){
	config={};
}


var twitter = require('twitter') 
, twit = new twitter(config.twitter_keys)
, tweets = []
, clients = [];

module.exports = {
	tweets : function(req,res){
		res.json(tweets);	
		req.socket.on('disconnect',function(){
			clients.splice(clients.indexOf(req.socket),1)
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
	return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}
function replaceHashTags(text) {
	var exp = /#(\S*)/ig;
	return text.replace(exp,"<a href='http://twitter.com/#!/search/$1'  target='_blank' >#$1</a>"); 
}
function replaceMentions(text) {
	var exp = /@(\w{3,})/ig;
	return text.replace(exp,"<a href='http://twitter.com/$1'  target='_blank' >@$1</a>"); 
}

twit.stream('statuses/filter', {track:'nomaspoderalpoder, nomaspoderapp'},function(stream){
	if(stream)
		stream.on('data', addData);
});

twit.search('#Nomaspoderapp OR #nomaspoderalpoder',{count:6}, function(data){
	//console.log(data);
	if(data && data.statuses)
		data.statuses.forEach(addData);
});
