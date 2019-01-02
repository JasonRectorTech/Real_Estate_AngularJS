(function() {
	"use strict";
	angular
		.module("app", [])
		.run(init);

	init.$inject = ["ionicLoading", "$rootScope"];

	function init($ionicLoading, $rootScope) {
		$rootScope.$on("backKeyPressed", function(e) {
			console.log("back pressed");
		}
	}
})();
