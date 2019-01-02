(function(){
    angular.module("component")
    .directive("analyzeProperty", analyzeProperty);
    
    analyzeProperty.$inject = []
    
    function analyzeProperty() {
        var directive = {
            restrict : 'E',
            templateUrl  : 'src/components/analyze-property/analyze-property.html',
            scope : {
                optionsText : "@",
                optionsObject : "="
            },
            controller : analyzePropertyCtrl,
            controllerAs : "vm"
        };
        return directive;
    }
    
    analyzePropertyCtrl.$inject = ["$rootScope", "$http", "mapService"];
    
    function analyzePropertyCtrl($rootScope, $http, mapService){
        var vm = this;
                
        alert("analyze property directive");
    }
})();