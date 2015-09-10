(function() {
  var app = angular.module("item-explorer", ['simulator-navigation']);

  app.directive("itemExplorerPanel", function() {
    return {
      restrict:"E",
      templateUrl:"views/panels/item-explorer.html",
      controller: function($scope, $q) {
        $scope.items = null;

        $scope.refreshInventory = function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          promise.then(function(result){
              $scope.items = result;
          }, function (reason) {
              $scope.items = null;
          });

          var p = Hive5.DataTable.get("items");
          p.then(function(response) {
              var jsonData = JSON.parse(response.raw);
              deferred.resolve(jsonData.data);
          });
        };
      },
      controllerAs:"itemExplorerPanelCtrl"
    }
  });
})();