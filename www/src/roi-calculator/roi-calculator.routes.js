(function() {
	angular
		.module("app.roi-calculator")
		.run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), 'roi-calculator');
    }

    function getStates() {
        return [
            {
                state: 'roi-calculator',
                config: {
                    url: '/roi-calculator',
                    views: {
                    	'': {
                    		templateUrl: 'src/roi-calculator/roi-calculator.html',
                            controller: 'roiCalculatorCtrl as vm'
                    	}
                    }
                }
            }
        ];
    }
})();