(function() {
	"use strict";
	angular
		.module("app.layout.sideMenu")
		.controller("LayoutCtrl", LayoutCtrl);
	function LayoutCtrl($state, $scope, menus) {
		var vm = this;
        
        vm.menus = menus.getMenus();
	}
})();