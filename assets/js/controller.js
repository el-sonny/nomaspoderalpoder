var app = angular.module('nomaspoderalpoderAPP', ['ui.bootstrap','localytics.directives','ngSanitize']);

app.controller('HomeCtrl', function ($scope,$sce) {

	$scope.entidades = entidades;
	$scope.representantes = representantes;
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	$scope.selectedCamara = 'S';
	$scope.selectedEntidad = $scope.entidades[21];
	$scope.defaultImg = "http://placekitten.com/74/74"

	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	$scope.socialLink = function(rep,network){
		var response = rep[network] ? rep[network] : false;
		if(response && network == 'twitter'){
			carouselCtrlresponse = 'https://twitter.com/intent/tweet?screen_name='+rep[network];
		}
        return response;
	}
	

	$scope.repFilter = function () {
		return function(rep){
			return (!$scope.selectedEntidad || $scope.selectedEntidad.id == rep.entidad.id)
			&& $scope.selectedCamara == rep.camara;
		};
	}

	$scope.camaras = {D:'Diputados',S:'Senadores'};

	socket.get('/twitter/tweets',function(tweets){
		for(var i=0;i<tweets.length;i++){
			tweets[i].timeString = moment(tweets[i].time).lang('es').fromNow();
		}
		$scope.tweets = tweets;
		$scope.$apply();
		socket.on('newTweet',function(tweet){
			tweet.timeString = moment(tweet.time).lang('es').fromNow();
			tweets.unshift(tweet)
			tweets.pop();
			$scope.$apply();
		});
	});

});

app.controller('carouselCtrl', function ($scope,$sce) {
	$scope.slides = [
		{
			header:'Las leyes secundarias de telecomunicaciones apestan!',
			content:'<p>No todos podemos ser diputados y senadores pero si podemos presionarlos via:</p><p> <i class="fa fa-twitter"></i><i class="fa fa-facebook"></i><i class="fa fa-youtube-play"></i></p>',
			button:{text:'Jode a tu diputado',href:'#'},
			image:'banner1.jpg'

		},
		{
			header:'Las leyes secundarias de telecomunicaciones apestan!',
			content:'<p>No todos podemos ser diputados y senadores pero si podemos presionarlos via:</p><p> <i class="fa fa-twitter"></i><i class="fa fa-facebook"></i><i class="fa fa-youtube-play"></i></p>',
			button:{text:'Jode a tu diputado',href:'#'},
			image:'banner2.jpg'

		},
	];
});


/*angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function($scope, $timeout, $transition, $q) {
}]).directive('carousel', [function() {
    return {

    }
}]);*/
