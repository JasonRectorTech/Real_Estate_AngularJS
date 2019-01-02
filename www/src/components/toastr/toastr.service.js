(function() {
	"use strict";
	angular
		.module("component")
        .factory("toastr", toastr);
    
    appCache.$inject = ["$rootScope"];
    
    function appCache($rootScope) {
        var service = {
            success : success  
        };
        
        return service;
        
        function success() {
            
        }
    }
})();