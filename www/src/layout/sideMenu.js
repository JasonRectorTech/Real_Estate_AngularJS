(function() {
	"use strict";

	angular
		.module("app.layout.sideMenu")
		.factory("menus", menus);

	function menus() {
        var menus = [{
            name : "Map",
            icon : "ion-ios-play",
            state : "map"
        }
        // {
        //     name : "ROI Calculator",
        //     icon : "ion-ios-play",
        //     state : "roi-calculator"
        // }
	];

        return {
            getMenus : getMenus
        };

        function getMenus() {
            return menus;
        }
	}
})();
