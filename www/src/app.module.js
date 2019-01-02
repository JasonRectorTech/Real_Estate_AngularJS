(function() {
	"use strict";
	angular
		.module("app",
			[
				'ngCordova',
				'app.core',
                'app.layout.sideMenu',
                'component',
                'app.map',
				'app.roi-calculator'
			]
		);
})();
