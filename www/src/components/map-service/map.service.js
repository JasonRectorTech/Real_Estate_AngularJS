(function() {
	"use strict";
	angular
		.module("component")
		.factory("mapService", mapService);
	mapService.$inject = ["$rootScope", "$timeout", "appCache"];

	function mapService($rootScope, $timeout, appCache) {
		//creates public functions
		var service = {
			createMap : createMap,
			setMarkers : setMarkers
		};

		var vm = this;

		//init fucntions
		vm.analyzeClicked = analyzeClicked;
		vm.dismissClicked = dismissClicked;

		//stores the marker that has been clicked
		vm.selectedMarker = {};

		return service;

		/**
		 * checks if the property is a good buy
		 */
		function analyzeClicked() {
			document.getElementById("analyzeClicked").addEventListener('click', function(e) {
				alert("Analyze clicked for " + vm.selectedMarker.property.streetAddress);
			});
		}

		/**
		 * dismisses the property to display it has a different color
		 * Stores the different colors in local storage
		 */
		function dismissClicked() {
			document.getElementById("dismissClicked").addEventListener('click', function(e) {
				var property = {
					address: vm.selectedMarker.property.streetAddress,
					date: new Date()
				};

				appCache.setLocalStorage("dismiss", property);
			});
		}

		//initializes the map
		function createMap() {
			var mapLayer = MQ.mapLayer(), map;

			map = L.map('mapid', {
				layers: mapLayer,
				// northwest arkansas
				center: [ 36.3545, -94.2004 ],
				// tampa bay
				// center: [ 27.888060, -82.755060 ],
				zoom: 12,
				maxZoom: 18
			});;

            //adds layer to change map type
//            L.control.layers({
//                'Map': mapLayer,
//                'Dark': MQ.darkLayer(),
//                'Light': MQ.lightLayer(),
//                'Satellite': MQ.satelliteLayer()
//            }).addTo(map);

			return map;
		}

		/**
		 * Draws the markers on the map
		 * @param { object } map Leaflet map. Also available through $rootscope.map
		 * @param { object[] } properties Contains the data for each property
		 */
		function setMarkers(map, properties) {
			var markerArray = [];

			//create the markers and it's properties
			var LeafIcon = L.Icon.extend({
				options : {
					iconUrl: '../www/img/marker-icon-2x.png',
					iconSize:     [38, 50], // size of the icon
					iconAnchor:   [22, 60], // point of the icon which will correspond to marker's location
					popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				}
			});

			//create new icon classes to change icon colors
			var blueIcon = new LeafIcon({iconUrl: '../www/img/marker-icon-2x.png'});
			var redIcon = new LeafIcon({iconUrl: '../www/img/marker-icon-red-2x.png'});

			for(var i=0; i < properties.length; i++) {
				//stores the popup after clicking on a marker
				var content = "";

				//gets the current list of dismissed properties
				var dismissedProperties = appCache.getLocalStorage("dismiss");

				//adds the red icon to the marker if the property has been dismissed
				if(appCache.searchStorage(properties[i].streetAddress, dismissedProperties)) {
					var marker = new L.marker([properties[i].latitude, properties[i].longitude], {icon: redIcon});
				} else {
					var marker = new L.marker([properties[i].latitude, properties[i].longitude], {icon: blueIcon});
				}

				marker.property = {
					streetAddress: properties[i].streetAddress,
					city: properties[i].city,
					state: properties[i].state,
					zipCode: properties[i].zipCode,
					forsalePrice: properties[i].forsalePrice,
					forsalePriceSqft: properties[i].forsalePriceSqft,
					rentalPrice: properties[i].rentalPrice,
					rentalPriceSqft: properties[i].rentalPriceSqft,
					sqft: properties[i].sqft,
					beds: properties[i].beds,
					baths: properties[i].baths,
					propertyURL: properties[i].propertyURL,
					date: properties[i].date,
					event: properties[i].event,
					longitude: properties[i].longitude,
					latitude: properties[i].latitude
				};

				//adds a click event listener to display a popup on click of each marker
				marker.on('click', function(e) {
					//stores the currently selected marker on vm
					vm.selectedMarker = e.target;
					//may need a button id, commenting out for now
					//var buttonId = "'" + vm.selectedMarker.property.streetAddress.replace(/\s/g,'') + "_selected" + "'";

					var content = "";

					//adds street address with link to property on realtor.com
					content = "<a href=" + vm.selectedMarker.property.propertyURL + " target='_blank'>" + vm.selectedMarker.property.streetAddress + "</a>";

					//adds city, state, and zip code
					content += "<div>" + vm.selectedMarker.property.city + " " + vm.selectedMarker.property.state + ", " + vm.selectedMarker.property.zipCode + "</div>";

					//adds forsale price
					content += "<div>$" + vm.selectedMarker.property.forsalePrice + " $" + vm.selectedMarker.property.forsalePriceSqft + "/sqft</div>";

					//adds rental price
					content += "<div>$" + vm.selectedMarker.property.rentalPrice + "/mo $" + vm.selectedMarker.property.rentalPriceSqft + "/sqft</div>";

					//adds sqft, beds, and baths
					content += "<div>" + vm.selectedMarker.property.sqft + " SqFt " + vm.selectedMarker.beds + " Beds " + vm.selectedMarker.property.baths + " Baths</div>";

					//adds date and event
					content += "<div>" + vm.selectedMarker.property.event + " " + vm.selectedMarker.property.date + "</div>";

					content += "<button id='analyzeClicked' ng-click='vm.analyzeClicked(this.id)' class='button button-clear'>Analyze</button>";

					//dismiss button
					content += "<button id='dismissClicked' ng-click='vm.dismissClicked()' class='button button-clear'>Dismiss</button>";

					vm.selectedMarker.bindPopup(content);

					//there is a race condition issue with leaflet with binding the contend and then opening it
					$timeout(function() {
						vm.selectedMarker.openPopup();
						//creates the event listeners
						vm.analyzeClicked();
						vm.dismissClicked();
					}, 100);
				});

				markerArray.push(marker);
			}

			//adds the array of markers on the map
			L.layerGroup(markerArray).addTo(map);

			/**
			 * Resets the map; used to 'refresh' the map
			 * @param { array } markerArray the array of markers on the map
			 */
			function clearMarkers(markerArray) {
				for(var i=0; i < markerArray.length; i++) {
					markerArray[i].setMap(null);
				}

				markerArray = [];
			}
		}
	}
})();
