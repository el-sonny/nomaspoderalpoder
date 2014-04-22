module.exports = {
	extractEntidades : function(){
		require('async');
		Representante.find({}).exec(function(e,representantes){
			async.mapSeries(representantes,extractEntidad);
		});
	}	
};

var extractEntidad = function(rep,callback){
	Entidad.findOrCreate({nombre:rep.entidad},{nombre:rep.entidad},function(e,entidad){
		if(e) return callback(e,entidad);
		rep.entidad = entidad.id;
		rep.save(callback);
	})
}