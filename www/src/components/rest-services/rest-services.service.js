(function() {
	"use strict";
	angular
		.module("component")
        .factory("$restService", $restService);
    
    $restService.$inject = ["$http"];
    
    function $restService($http) {
        delete $http.defaults.headers.common['X-Requested-With'];
        
        var service = {
            getServiceRequest : getServiceRequest  
        };
        
        return service;
        
        function getServiceRequest(callbackFunc) {
            $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/hello',
            //params: 'limit=10, sort_by=created:desc',
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
             }).success(function(data){
                // With the data succesfully returned, call our callback
                callbackFunc(data);
            }).error(function(){
                alert("error");
            });
        }
    }
})();