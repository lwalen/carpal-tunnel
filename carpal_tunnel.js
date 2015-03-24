
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
		when('/categories/:categoryName', {
			templateUrl: 'category.html',
			controller: 'CategoryCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});

carpalTunnel.controller('MainCtrl', function($scope, $http) {


});

carpalTunnel.controller('CategoryCtrl', function($scope, $http, $routeParams) {
	$http.get('data.json').success(function(data) {
		$scope.name = $routeParams.categoryName;

		var diseases = [];

		for (var i = 0; i < data.length; i++) {

			var category = "";

			if (data[i].category) {
				category = data[i].category;
			} else if (data[i].name) {
				category = data[i].name;
			}

			if (category === $scope.name) {
				diseases = data[i].diseases;
			}
		}

		$scope.diseases = diseases;
	});
});

carpalTunnel.controller('DiseasesListCtrl', function($scope, $http) {
	$http.get('data.json').success(function(data) {

		var categories = [];

		for (var i = 0; i < data.length; i++) {

			var category = "";

			if (data[i].category) {
				category = data[i].category;
			} else if (data[i].name) {
				category = data[i].name;
			}

			categories[i] = category;
		}

		$scope.categories = categories;
	});
});

carpalTunnel.filter('encodeURI', function(){
	return function(input) {
		return input.replace(/[\/ ]/g, '_');
	};
});
