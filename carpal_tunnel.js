
var carpalTunnel = angular.module('carpalTunnel', ['ngRoute']);

carpalTunnel.config(function($routeProvider) {

	$routeProvider.
		when('/', {
			templateUrl: 'main.html',
			controller: 'MainCtrl'
		}).
		when('/categories', {
			templateUrl: 'categories-list.html',
			controller: 'CategoriesListCtrl'
		}).
		when('/categories/:categoryName', {
			templateUrl: 'category.html',
			controller: 'CategoryCtrl'
		}).
		when('/diseases', {
			templateUrl: 'diseases-list.html',
			controller: 'DiseasesListCtrl'
		}).
		when('/diseases/:diseaseName', {
			templateUrl: 'disease.html',
			controller: 'DiseaseCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});

carpalTunnel.controller('MainCtrl', function($scope, $http) {


});

carpalTunnel.controller('CategoryCtrl', function($scope, $http, $routeParams) {
	$http.get('data.json').success(function(data) {
		$scope.name = decodeURI($routeParams.categoryName);

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

carpalTunnel.controller('CategoriesListCtrl', function($scope, $http) {
	$http.get('data.json').success(function(data) {

		var categories = [];

		for (var i = 0; i < data.length; i++) {

			var category = "";

			if (data[i].category) {
				category = {
					name: data[i].category,
					url: "categories/" + encodeURI(data[i].category)
				};
			} else if (data[i].name) {
				category = {
					name: data[i].name,
					url: "diseases/" + encodeURI(data[i].name)
				};
			}

			categories[i] = category;
		}

		$scope.categories = categories;
	});
});

carpalTunnel.controller('DiseaseCtrl', function($scope, $http, $routeParams) {
	$http.get('data.json').success(function(data) {
		var disease_name = decodeURI($routeParams.diseaseName);

		var disease = {};

		for (var i = 0; i < data.length; i++) {

			if (data[i].category) {
				for (var j = 0; j < data[i].diseases.length; j++) {
					if (data[i].diseases[j].name === disease_name) {
						disease = data[i].diseases[j]
					}
				}
			} else if (data[i].name && data[i].name === disease_name) {
				disease = data[i];
			}
		}

		$scope.disease = disease;
	});
});

carpalTunnel.controller('DiseasesListCtrl', function($scope, $http) {
	$http.get('data.json').success(function(data) {

		var diseases = [];

		for (var i = 0; i < data.length; i++) {

			if (data[i].category) {
				diseases = diseases.concat(data[i].diseases);
			} else if (data[i].name) {
				diseases.push(data[i]);
			}
		}
		$scope.diseases = diseases.sort(compare);
	});
});

carpalTunnel.filter('encodeURI', function(){
	return function(input) {
		return encodeURI(input);
	};
});

function encodeURI(uri) {
	return uri.replace(/ /g, '_').replace(/\//g, '+');
}

function decodeURI(uri) {
	return uri.replace(/_/g, ' ').replace(/\+/g, '/');
}

function compare(a, b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
