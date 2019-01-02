(function() {
	"use strict";

	angular
		.module("app.roi-calculator")
		.controller("roiCalculatorCtrl", roiCalculatorCtrl);
    
    roiCalculatorCtrl.$inject = ["$scope", "$state", "$ionicNavBarDelegate", "$ionicHistory"];

	function roiCalculatorCtrl($scope, $state, $ionicNavBarDelegate, $ionicHistory) {
		var vm = this;
        
        
        
        //init variables
        vm.isCalculated = false;
        vm.purchasePrice = 0;
        vm.downPayment = 0;
        vm.interestRate = 0;
        vm.rentalIncome = 0;
        vm.taxes = 0;
        vm.insurance = 0;
        vm.loanTerm = 0;
        vm.cashFlow = 0;
        vm.cashReturn = 0;
        
        //functions
        vm.calcClicked = calcClicked;
        vm.selectText = selectText;
        vm.priceChanged = priceChanged;
        
        function calcClicked() {
            vm.isCalculated = true;
            
            vm.cashFlow = "$400";
            vm.cashReturn = "19.8%";
        }
        
        function selectText($event) {
            $event.target.select();
        }
        
        function priceChanged() {
            
        }
        
	}
})();