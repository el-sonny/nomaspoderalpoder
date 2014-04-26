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

		Representante.find().exec(function(err,rep){
			rep.forEach(function(e,i){
				if(e.twitter && !e['twitter_avatar'] ){
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