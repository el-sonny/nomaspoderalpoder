var app = angular.module('nomaspoderalpoderAPP', ['ui.bootstrap','localytics.directives','ngSanitize']);

app.controller('HomeCtrl', function ($scope,$sce,$window) {

	$scope.entidades = entidades;
	$scope.representantes = representantes;
	$scope.socialNetworks = ['twitter','facebook','youtube'];
	$scope.selectedCamara = 'S';
	$scope.selectedEntidad = $scope.entidades[8];
	$scope.defaultImg = 'http://placehold.it/73x73&text=++';
	$scope.tweetMessage = 'exigimos se deseche la iniciativa pres. de ley de telecom. y se consensúe una nueva con la sociedad';
	$scope.camara = function(camara){
		return camara == 'S' ? 'Senado' : 'Congreso';
	}
	$scope.tweetlink = function(rep){
		var camaras = {'S':'Senador','D':'Diputado'};
		return rep.twitter ? 'https://twitter.com/intent/tweet/?text='+$scope.tweetMessage+'&screen_name='+rep.twitter+'&hashtags=Nomáspoderapp' : false;
	}
	$scope.socialLink = function(rep,network){
		var prefixes = {'twitter':'https://twitter.com/#!','facebook':'http://www.facebook.com/','youtube':'http://www.youtube.com/user/'};
		var response = rep[network] ? prefixes[network]+rep[network] : false;
        return response;
	}
	$scope.tweetChars = function(){
		return 110 - $scope.tweetMessage.length;
	}
	$scope.avgLength = function(){
		var sum = 0;
		var length = 0;
		$scope.representantes.forEach(function(rep){
			if(rep.twitter){
				sum += rep.twitter.length;
				length++;
			}
		});
		return sum/length;
	}

	$scope.massTweet = function(){
		$scope.filteredReps.forEach(function(rep){
			if(rep.twitter){
				console.log('open window');
				$window.open($scope.tweetlink(rep));
			}
		});
		ga('send', 'event', 'button', 'massTweet', $scope.selectedEntidad.nombre+' '+$scope.camaras[$scope.selectedCamara]);
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
			tweets.unshift(tweet);
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
			header:'El congreso de la Unión no sólo legisla a nuestras espaldas, sino también en nuestra contra.',
			content:'<p>¿Por qué quienes deberían representarnos actúan de ese modo?<br/>¡Es hora de que los ciudadanos seamos escuchados!',
			//'<p></p>'+
			//'<p></p>',
			button:{text:'Exígele a tus representantes',href:'/#representantes'},
			image:'banner1-2.jpg'

		},
		{
			header:'No solo las leyes propuestas al Internet están mal.',
			content:'<p>La iniciativa presidencial de Ley de Telecomunicaciones contiene muchos puntos inconstitucionales, incongruentes o que contravienen el interés público.</p>'+
			'<p>Te recomendamos leer el análisis de la Investigadora Clara Luz Álvarez donde resume algunos de estos puntos.</p>',
			button:{text:'lee el análisis ',href:'/analisis#analisis'},
			image:'banner2-1.jpg'
		},
	];
});

	$(function () {
		$('.footable').footable();
	});


/*angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function($scope, $timeout, $transition, $q) {
}]).directive('carousel', [function() {
    return {

    }
}]);



¿Por qué quienes deberían representarnos actúan de ese modo?
 

 

*/
