(function() {
    var app = angular.module("run-script", ['simulator-navigation']);

    app.directive("runScriptPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/run-script.html",
            controller: function($scope, $q) {
              $scope.runScriptService = this;

              $scope.scriptName = "getUser";
              $scope.scriptParameters = "{}";

              this.tab = 'request';
              this.scriptName = "getUser";
              this.parameters = "{\n\t\"param\":1\n}";

              this.selectTab = function selectTab(tab)
              {
                this.tab = tab;
              };

              this.isSelected = function getIsSelected(path) {
                return this.tab === path;
              }


              $scope.runScript = function() {
                $scope.responseResult = "";
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.responseResult = result;
                  $scope.runScriptService.selectTab('response');
                }, function (reason) {
                  $scope.responseResult = "";
                  $scope.runScriptService.selectTab('response');


                  alert(reason);
                });

                var p = Hive5.Script.runScript($scope.scriptName, $scope.scriptParameters);
                p.then(function(response) {
                  deferred.resolve(response.raw);
                });
              };
            },
            controllerAs:"runScriptPanelCtrl"
        }
    });
})();