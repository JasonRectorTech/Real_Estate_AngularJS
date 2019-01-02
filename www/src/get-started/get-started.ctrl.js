(function() {
	"use strict";

	angular
		.module("app.get-started")
		.controller("getStartedCtrl", getStartedCtrl);

	function getStartedCtrl($state) {
		var vm = this;
        vm.test = "Test from Starting Controller"
        
        alert("This is a test " + vm.test);
	}
})();