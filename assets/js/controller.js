var app = angular.module('nomaspoderalpoderAPP', []);
app.controller('HomeCtrl', function ($scope,$sce) {
	$scope.entidades = [];
	socket.get('/entidad/?sort=nombre',function (entidades){
		$scope.entidades = entidades;
		$scope.$apply();
	});	
	$scope.classActive = function(bool){
		return bool ? 'active' : '';
	}
	/*socket.on('mia', function (msg){
		$scope.mia = msg.data ;
		$scope.$apply();
	});*/
});