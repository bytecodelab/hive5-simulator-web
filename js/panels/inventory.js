(function() {
    var app = angular.module("inventory", ['simulator-navigation']);

    app.directive("inventoryPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/inventory.html",
            controller: function($scope, $q) {
              $scope.inventory_items = null;

              $scope.reloadInventory = function() {
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.inventory_items = result;
                }, function (reason) {
                  $scope.inventory_items = null;
                });

                var p = Hive5.Script.runScript("getUser", "");
                p.then(function(response) {
                  var jsonData = JSON.parse(response.raw);
                  deferred.resolve(jsonData.call_return.inventory);
                });
              };
            },
            controllerAs:"inventoryPanelCtrl"
        }
    });
})();