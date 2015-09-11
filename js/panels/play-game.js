(function(root) {
    var app = angular.module("play-game", ['simulator-navigation']);

    app.directive("playGamePanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/play-game.html",
            controller: function($scope, $q) {
              $scope.result = "";
              $scope.score = 100;
              $scope.exp = 100;

              this.startGame = function() {
                $scope.result = "";

                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.result = JSON.stringify(result);
                  root.userService.updateUserInfo(result.user);

                }, function (reason) {
                  $scope.result = "";

                  alert(reason);
                });

                var p = Hive5.Script.runScript("gameStart");
                p.then(function(response) {
                  var jsonData = JSON.parse(response.raw);

                  if (jsonData.result_code == 0) { // OK
                    deferred.resolve(jsonData.call_return);
                  } else {
                    deferred.reject(jsonData.result_message);
                  }
                });
              };

              this.endGame = function() {
                $scope.result = "";

                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.result = JSON.stringify(result);
                  root.userService.updateUserInfo(result.user);
                }, function (reason) {
                  $scope.result = "";


                  alert(reason);
                });

                var p = Hive5.Script.runScript("gameEnd", {score: $scope.score, exp:$scope.exp });
                p.then(function(response) {
                  var jsonData = JSON.parse(response.raw);
                  if (jsonData.result_code == 0) { // OK
                    deferred.resolve(jsonData.call_return);
                  }
                  else {
                    deferred.reject(jsonData.result_message);
                  }
                });
              };
            },
            controllerAs:"playGamePanelCtrl"
        }
    });
})(this);