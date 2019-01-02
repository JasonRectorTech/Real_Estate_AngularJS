(function(){
    angular.module("component")
    .directive("directiveExample", directiveExample);
    
    directiveExample.$inject = []
    
    function directiveExample() {
        var directive = {
            restrict : 'E',
            templateUrl  : 'src/components/directive-example/directive-example.html',
            scope : {
                optionsText : "@",
                optionsObject : "="
            },
            controller : DirectiveExampleCtrl,
            controllerAs : "vm",
            bindToController : true
        };
        return directive;
    }
    
    DirectiveExampleCtrl.$inject = ["$rootScope"];
    
    function DirectiveExampleCtrl($rootScope){
        var vm = this;
        vm.isVisible = false;
        
        vm.exampleFunction = exampleFunction;
        
        function exampleFunction(){
            vm.isVisible = true;
        }
    }
})();