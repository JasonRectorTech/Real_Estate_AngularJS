(function() {
	angular
		.module("app.map")
		.run(appRun);

	function appRun(routerHelper) {
		routerHelper.configureStates(getStates(), 'map');
	}

	function getStates() {
		return [
			{
				state: 'map',
				config: {
					url: '/map',
					views: {
						'': {
							templateUrl: 'src/map/map.html',
							controller: 'mapController as vm'
						}
					}
				}
			}
		];
	}
})();
