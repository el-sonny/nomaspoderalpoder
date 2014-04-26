var app = angular.module('nomaspoderalpoderAPP', ['ui.bootstrap','localytics.directives','ngSanitize']);

app.controller('HomeCtrl', function ($scope,$sce) {

	$scope.entidades = entidades;
	$scope.representantes = representantes;
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	$scope.selectedCamara = 'S';
	$scope.selectedEntidad = $scope.entidades[8];
	$scope.defaultImg = 'http://placehold.it/73x73&text=++';

	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	$scope.tweetlink = function(rep){
		var camaras = {'S':'Senador','D':'Diputado'};
		var text	= 'exigimos se deseche la iniciativa pres. de ley de telecom. y se consensúe una nueva con la sociedad'; 
		return rep.twitter ? 'https://twitter.com/intent/tweet/?text='+text+'&hashtags=Nomáspoderapp&screen_name='+rep.twitter : false;
	}
	$scope.socialLink = function(rep,network){
		var prefixes = {'twitter':'https://twitter.com/#!','facebook':'http://www.facebook.com/','youtube':'http://www.youtube.com/user/'};
		var response = rep[network] ? prefixes[network]+rep[network] : false;
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

	$scope.reportTweet = function(rep){
		ga('send', 'event', 'button', 'tweet', rep.nombre);
	}

});

app.controller('carouselCtrl', function ($scope,$sce) {
	$scope.slides = [
		{
			header:'El Congreso de la Unión, legisla no sólo a espaldas de nosotros, sino en nuestra contra.',
			content:'<p>¿Por qué quienes deberían representarnos actúan de ese modo? ¡Es hora de que los ciudadanos seamos escuchados!</p>'+
			'<p>Esta plataforma es una herramienta para que vía redes sociales exijas a los congresistas mexicanos, desechar la iniciativa presidencial de Ley de Telecomunicaciones y Radiodifusión y elaborar una nueva en beneficio de la sociedad y contra de los monopolios.</p>'+
			'<p>Encuentra por estado a tu senador y diputado.</p>',
			button:{text:'Busca tu Representante',href:'#representantes'},
			image:'banner1.jpg'

		},
		{
			header:'Las leyes secundarias de telecomunicaciones apestan!',
			content:'<p>No todos podemos ser diputados y senadores pero si podemos presionarlos via:</p><p class="social-icons"> <a href="#tw"><i class="fa fa-twitter"></i></a><a href="#fb"><i class="fa fa-facebook"></i></a><a href="#yt"><i class="fa fa-youtube-play"></i></a></p>',
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
}]);



¿Por qué quienes deberían representarnos actúan de ese modo?
 

 

*/
