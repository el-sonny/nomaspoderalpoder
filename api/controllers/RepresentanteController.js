/**
 * RepresentanteController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	home : function(req,res){
		Entidad.find({}).sort('nombre').exec(function(e,entidades){
			Representante.find({}).populate('entidad').exec(function(e,representantes){
				res.view({entidades:entidades,representantes:representantes});
			})
		});		
	}
};
