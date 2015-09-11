(function() {
    var app = angular.module("inventory", ['simulator-navigation']);

    app.directive("inventoryPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/inventory.html",
            controller: function($scope, $q) {
              $scope.inventory_items = [];

              $scope.refreshInventory = function() {
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.inventory_items = result;
                }, function (reason) {
                  $scope.inventory_items = [];
                });

                var p = Hive5.Script.runScript("getUser", "");
                p.then(function(response) {
                  var jsonData = JSON.parse(response.raw);
                  if (jsonData.result_code == 0) { // OK
                    deferred.resolve(jsonData.call_return.user.inventory);
                  } else {
                    alert(jsonData.result_message);
                  }
                });
              };
            },
            controllerAs:"inventoryPanelCtrl"
        }
    });
})();