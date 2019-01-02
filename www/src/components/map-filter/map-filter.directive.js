(function(){
	angular.module("component")
	.directive("mapFilter", mapFilter);

	mapFilter.$inject = []

	function mapFilter() {
		var directive = {
			restrict : 'E',
			templateUrl  : 'src/components/map-filter/map-filter.html',
			scope : {
				optionsText : "@",
				optionsObject : "="
			},
			controller : MapFilterCtrl,
			controllerAs : "vm"
		};

		return directive;
	}

	MapFilterCtrl.$inject = ["$rootScope", "$http", "mapService"];

	function MapFilterCtrl($rootScope, $http, mapService){
		var vm = this;

		//init functions
		vm.initVariables = initVariables;
		vm.cancelSelected = cancelSelected;
		vm.filterSelected = filterSelected;
		vm.bedSelected = bedSelected;
		vm.bathSelected = bathSelected;
		vm.rentalSelected = rentalSelected;

		vm.initVariables();

		function initVariables() {
			//user for radio buttons
			vm.beds = "";
			vm.baths = "";

			//used for input
			vm.bedQty = 0;
			vm.bathQty = 0;
			vm.isBedsExact = false;
			vm.isBathsExact = false;

			//init checkboxes
			vm.isForsaleDropdown = false;
			vm.isRentalDropdown = false;
			vm.forsaleDropdown = {
				'For Sale': false,
				'Foreclosure': false,
				'Pending': false,
				'Sold': false,
				'Recently Sold': false
			};

			vm.rentalStatus = {
				'No Rentals' : true,
				'For Rent': false,
				'Rented': false
			};

			vm.bedQtySelection = {
				'1+': false,
				'2+': false,
				'3+': false,
				'4+': false,
				'Exact': false
			};

			vm.bathQtySelection = {
				'1+': false,
				'2+': false,
				'3+': false,
				'4+': false,
				'Exact': false
			};
		}

		 /**
 		 * Updates rental status with selected value
 		 * @param { object } rental Value of the radio button clicked
 		 */
		function rentalSelected(rental) {
			for(var key in vm.rentalStatus) {
				//selected button
				if(key.includes(rental)) {
					vm.rentalStatus[rental] = true;
				}
				//not selected
				else {
					vm.rentalStatus[key] = false;
				}
			}
		}

		//beds button selected
		function bedSelected(bed) {
			for(var key in vm.bedQtySelection) {
				//selected button
				if(key.includes(bed)) {
					vm.bedQtySelection[bed] = true;
					//if exact, do not highlight and change views
					if(bed === "Exact") {
						vm.bedQtySelection[bed] = false;
						vm.isBedsExact = true;
					}
				}
				//not selected
				else {
					vm.bedQtySelection[key] = false;
				}
			}
		}

		//beds button selected
		function bathSelected(bath) {
			for(var key in vm.bathQtySelection) {
				//selected button
				if(key.includes(bath)) {
					vm.bathQtySelection[bath] = true;
					//if exact, do not highlight and change views
					if(bath === "Exact") {
						vm.bathQtySelection[bath] = false;
						vm.isBathsExact = true;
					}
				}
				//not selected
				else {
					vm.bathQtySelection[key] = false;
				}
			}
		}

		//cancel clicked
		function cancelSelected() {
			$rootScope.isFilterShown = false;
		}

		//filter clicked
		function filterSelected() {
			var beds = "";
			var baths = "";

			//determine bed variable
			if(vm.isBedsExact === true) {
				beds = vm.bedQty;
			}
			else {
				beds = vm.bedQtySelection;
				//flask URL won't take special char without decoding URL.
				beds = getKeyFromVal(true, beds);
			}

			//determine bath variable
			if(vm.isBathsExact === true) {
				baths = vm.bathQty;
			} else {
				baths = vm.bathQtySelection;
				//flask URL won't take special char without decoding URL.
				baths = getKeyFromVal(true, baths);
			}

			//formats options
			if(vm.minPriceSqft === null || vm.minPriceSqft === undefined || vm.minPriceSqft < 1) {
				vm.minPriceSqft = 0;
			}
			else if(vm.minPriceSqft > vm.maxPriceSqft || vm.maxPriceSqft < vm.minPriceSqft) {
				alert("Max or Min Price/sqft is not correct");
				return;
			}
			if(vm.maxPriceSqft === null || vm.maxPriceSqft === undefined || vm.maxPriceSqft < 1) {
				vm.maxPriceSqft = 0;
			}
			if(vm.minSqft === null || vm.minSqft === undefined || vm.minSqft < 1) {
				vm.minSqft = 0;
			}
			if(vm.maxSqft === null || vm.maxSqft === undefined || vm.maxSqft < 1) {
				vm.maxSqft = 0;
			}
			else if(vm.minSqft > vm.maxSqft || vm.maxSqft < vm.minSqft) {
				alert("Max or Min sqft is not correct");
				return;
			}
			if(beds === null || beds === undefined || beds < 1) {
				beds = "";
			}
			if(baths === null || baths === undefined || baths < 1) {
				baths = "";
			}

			$http({
				method: 'GET',
				url: $rootScope.baseUrl + "getProperties",
				params: {
					cities: $rootScope.cities,
					minPriceSqft: vm.minPriceSqft,
					maxPriceSqft: vm.maxPriceSqft,
					minSqft: vm.minSqft,
					maxSqft: vm.maxSqft,
					isForSale: vm.forsaleDropdown["For Sale"],
					isForeclosure: vm.forsaleDropdown["Foreclosure"],
					isPending: vm.forsaleDropdown["Pending"],
					isSold: vm.forsaleDropdown["Sold"],
					isRecentlySold: vm.forsaleDropdown["Recently Sold"],
					isNoRentals: vm.rentalStatus["No Rentals"],
					isForRent: vm.rentalStatus["For Rent"],
					isRented: vm.rentalStatus["Rented"],
					beds: beds,
					baths: baths
				}
			}).success(function(response){
				properties = response.results;

				if(properties.length > 0) {
					mapService.getPoints($rootScope.map, properties);
				} else {
					alert("No properties were found which meets your search criteria")
				}
			}).error(function(){
				//alert("There was an error retreiving rentals in the database");
			});

			//hide filter
			$rootScope.isFilterShown = false;
		}
	}

	//returns the matching key for a given value in an object
	function getKeyFromVal(value, array) {
		for (var key in array) {
			this_value = array[key];
			if(this_value == value){
				return key;
				break;
			}
		}
	}

})();
