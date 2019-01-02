(function() {
	"use strict";
	angular
		.module("component")
		.factory("appCache", appCache);

	appCache.$inject = ["$rootScope", "$window"];

	function appCache($rootScope, $window) {
		var service = {
			appCache : appCache,
			setLocalStorage : setLocalStorage,
			getLocalStorage : getLocalStorage,
			removeLocalStorage : removeLocalStorage,
			searchStorage : searchStorage
		};

		return service;

		function appCache() {

		}

		function setLocalStorage(key, value) {
			var savedData = [];
			var newData = [];

			//get existing data
			//convert to json array
			//check if data is currently in there
			//if data is not in there, add it to the array

			savedData = getLocalStorage(key);

			//add if empty
			if(!Array.isArray(savedData)) {
				savedData = [];
				savedData.push(value);
				$window.localStorage.setItem(key, JSON.stringify(savedData));
			}
			//if data is found
			else {
				var isItemSaved = searchStorage(value.address, savedData);
				//if selected address isn't found
				if(!isItemSaved) {
					savedData.push(value);
					$window.localStorage.setItem(key, JSON.stringify(savedData));
				}
			}
			console.log(savedData);
		}

		function getLocalStorage(key) {
			return JSON.parse($window.localStorage.getItem(key));
		}

		function removeLocalStorage(key) {
			$window.localStorage.removeItem(key);
		}

		function searchStorage(item, array) {
			var isFound = false;
			if(Array.isArray(array)) {
				for (var i=0; i < array.length; i++) {
					if (array[i].address === item) {
						isFound = true;
					}
				}
			}

			return isFound;
		}
	}
})();
