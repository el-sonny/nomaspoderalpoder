var app = angular.module('contraelsilencioAPP', []);
app.controller('HomeCtrl', function ($scope,$sce) {
	$scope.entidades = [];
	socket.get('/entidad/',function (entidades){
		$scope.entidades = entidades;
	});	
	/*socket.on('mia', function (msg){
		$scope.mia = msg.data ;
		$scope.$apply();
	});*/
});