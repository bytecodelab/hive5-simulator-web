(function() {
  var app = angular.module("player", ['simulator-navigation']);

  app.directive("playerPanel", function() {
    return {
      restrict:"E",
      templateUrl:"views/panels/player.html",
      controller: function($scope, $q) {
        $scope.player = {};

        $scope.loadPlayer = function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          promise.then(function(result){
            $scope.player = result;
          }, function (reason) {
            $scope.player = {};
          });

          var p = Hive5.Script.runScript("getUser");
          p.then(function(response) {
            var jsonData = JSON.parse(response.raw);
            deferred.resolve(jsonData.call_return.user);
          });
        };
      },
      controllerAs:"playerPanelCtrl"
    }
  });
})();