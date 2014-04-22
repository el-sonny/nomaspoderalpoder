var app = angular.module('nomaspoderalpoderAPP', []);
app.controller('HomeCtrl', function ($scope,$sce) {
	$scope.entidades = [];
	socket.get('/entidad/',{sort:'nombre'},function (entidades){
		$scope.entidades = entidades;
		$scope.$apply();
	});	
	
	$scope.representantes = [];
	socket.get('/representante/',{sort:'nombre',limit:1000},function (representantes){
		$scope.representantes = representantes;
		$scope.$apply();
	});	
	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	/*socket.on('mia', function (msg){
		$scope.mia = msg.data ;
		$scope.$apply();
	});*/
});