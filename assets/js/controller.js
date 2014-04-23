var app = angular.module('nomaspoderalpoderAPP', []);
app.controller('HomeCtrl', function ($scope,$sce) {
	$scope.entidades = [];
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	socket.get('/entidad/',{sort:'nombre'},function (entidades){
		$scope.entidades = entidades;
		$scope.$apply();
	});	
	
	$scope.representantes = [];
	socket.get('/representante/',{sort:'nombre',limit:10},function (representantes){
		$scope.representantes = representantes;
		$scope.$apply();
	});	
	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	$scope.socialLink = function(rep,network){
        return rep[network] ? rep[network] : false;
	}
	$scope.selectedEntidades = [];    
	$scope.filterReps = function () {
		return function (rep) {

			console.log($scope.selectedEntidades);
		//	console.log($scope.entidades);
			//return $scope.selectedEntidades[rep.entidad.id] === true;
			return true;
		}
	}

	$(document).on('click','.entidades label',function(e){
		$(this).children().prop('checked',true);
		$scope.$apply();
	});
	/*socket.on('mia', function (msg){
		$scope.mia = msg.data ;
		$scope.$apply();
	});*/
});