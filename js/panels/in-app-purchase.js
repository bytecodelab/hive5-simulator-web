(function() {
  var app = angular.module("in-app-purchase", ['simulator-navigation']);

  app.directive("inAppPurchasePanel", function() {
    return {
      restrict:"E",
      templateUrl:"views/panels/in-app-purchase.html",
      controller: function($scope, $q) {
        $scope.products = null;

        $scope.reloadInAppPurchase = function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          promise.then(function(result){
            $scope.products = result;
          }, function (reason) {
            $scope.products = null;
          });

          var p = Hive5.DataTable.get("products");
          p.then(function(response) {
            var jsonData = JSON.parse(response.raw);
            deferred.resolve(jsonData.data);
          });
        };
      },
      controllerAs:"inAppPurchasePanelCtrl"
    }
  });
})();