(function() {
	"use strict";
	angular
	.module("app.map")
	.controller("mapController", mapController);

	mapController.$inject = ["$rootScope", "$scope", "$http", "mapService"];

	function mapController($rootScope, $scope, $http, mapService) {
		var vm = this;

		//functions
		vm.getPropertiesBySqft = getPropertiesBySqft;
		vm.getBaseUrl = getBaseUrl;

		$rootScope.isFilterShown = false;
		$rootScope.map = mapService.createMap();
		vm.env = "prod";
		$rootScope.baseUrl = getBaseUrl(vm.env);
		// $rootScope.cities = ["Clearwater", "Dunedin", "Largo", "Palm Harbor", "Saint Petersburg", "Seminole"];
		$rootScope.cities = ["Bentonville"];

		$scope.$on('$ionicView.enter', function() {
			vm.getPropertiesBySqft();
		});

		/**
		 * Calls getProperties service to get a list of properties based on given params
		 */
		function getPropertiesBySqft() {
			$http({
				method: 'GET',
				url: $rootScope.baseUrl + "getProperties",
				params: {
					cities: $rootScope.cities,
					minForsalePrice: 130000,
					maxForsalePrice: 300000,
					minPriceSqft: 75,
					maxPriceSqft: 150,
					minSqft: 1250,
					isForSale: true,
					beds: "2+",
					baths: "2+"
				}
			}).success(function(response) {
				var properties = [];
				properties = response.results;
				if(properties.length > 0) {
					mapService.setMarkers($rootScope.map, properties);
				} else {
					alert("No properties were found which meets your search criteria")
				}
			}).error(function() {
				alert("An error occurred while trying to find properties");
			});
		}

		function getBaseUrl(env) {
			if(env === "dev") {
				return "http://localhost:5000/";
			} else if(env === "prod") {
				return "http://flask-env.gm5rkv3qpa.us-east-2.elasticbeanstalk.com/";
			}
		}
	}
})();
