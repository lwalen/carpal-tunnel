
var carpalTunnel = angular.module('carpalTunnel', ['ngRoute']);

carpalTunnel.config(function($routeProvider) {

	$routeProvider.
		when('/', {
			templateUrl: 'main.html',
			controller: 'MainCtrl'
		}).
		when('/diseases', {
			templateUrl: 'diseases-list.html',
			controller: 'DiseasesListCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});

carpalTunnel.controller('MainCtrl', function($scope, $http) {


});

carpalTunnel.controller('DiseasesListCtrl', function($scope, $http) {
	$http.get('data.json').success(function(data) {
		var categories = [];
		for (var i = 0; i < data.length; i++) {
			console.log(data[i].category);
			if (data[i].category) {
				categories[i] = data[i].category;
			} else if (data[i].name) {
				categories[i] = data[i].name;
			}
		}
		$scope.categories = categories;
	});
});
