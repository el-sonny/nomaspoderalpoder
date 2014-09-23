/*module.exports = {
	extractEntidades : function(){
		require('async');
		Representante.find({}).exec(function(e,representantes){
			async.mapSeries(representantes,extractEntidad,function(err,res){
				if(err){console.log(err); throw err};				
				console.log('Reps Procesados: %d',res.length);
			});
		});
	}
	, getAvatars: function(){
		var self = this
		,  twitter = require('twitter')
		, twit = new twitter(sails.config.twitter_keys);

		Representante.find({id:'535ac537c373753cc3adcee5'}).exec(function(err,rep){
			rep.forEach(function(e,i){

				if(e.twitter){
					twit.get('/users/show.json',{screen_name:e.twitter},function(data){
						if(data && data.profile_image_url){
							var img = data.profile_image_url.replace('_normal','_bigger');
							Representante.update({id:e.id}
							,{
								twitter_avatar:img
							}
							, function(err){
								if(err) console.log(err);
								console.log("update avatar %s",e.nombre);
							});
						}else{
							console.log('response:',data.statusCode);
						}

					});	
				}
			});

		});
	}
};
//Representante.find().done(function(e,r){console.log(r)});
var extractEntidad = function(rep,callback){
	Entidad.findOrCreate({nombre:rep.estado},{nombre:rep.estado},function(e,entidad){
		if(e) return callback(e,entidad);
		rep.entidad = entidad.id;
		rep.save(callback);
	})
}
*/ 
var twitter = require('twitter')
, cron = require('cron').CronJob;
module.exports.twitterAvatarsInit = function(){
	new cron('0 35 5 * * *',twitterAvatars, true, true);
	twitterAvatars();
};

function twitterAvatars(){
	Representante.find({$query:{twitter:{$gt:''}},orderby:{updatedAt:-1}}).exec(function(err,representantes){	
		if(err) throw err;
		var nextRepresentante = function(){
			if(representantes.length){
		 		var representante = representantes.pop();
				getAvatar(representante.twitter,function(err,src){
					if(err){
						if(err.statusCode != 429)
							return nextRepresentante();

						representantes.push(representante);
						time();
						return console.log(err);
					}

					src = src.replace('_normal','_bigger');
					Representante.update({id:representante.id}
					,{
						twitter_avatar:src
					}
					, function(err){
						if(err) return console.log(err);
						console.log("update avatar %s",representante.nombre);
						nextRepresentante();
					});
				});
			}else{
				console.log('all update!');
			}
		};

		var time = function(){
			setTimeout(function(){
				if(representantes.length){
					nextRepresentante();
				}
			},2100000);//35m
		};
		nextRepresentante();
	 });
};

function getAvatar(user,cb){
	var twit = new twitter(sails.config.twitter_avatars);
	twit.get('/users/show.json',{screen_name:user},function(data){
		if(data && data.profile_image_url){
			return cb(null,data.profile_image_url);
		}
		return cb(data);
	});
}
