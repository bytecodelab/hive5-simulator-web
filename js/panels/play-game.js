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
                  $scope.result = JSON.stringify(result, null, 2);
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

                  if (result.levelUp && result.highScored) {
                    alert('레벨업 보상, 최고득점 보상이 제공되었습니다.\n우편함을 확인하세요.');
                  } else {
                    if (result.levelUp) {
                      alert('레벨업 보상 제공되었습니다.\n우편함을 확인하세요.');
                    }
                    if (result.highScored) {
                      alert('최고득점 보상이 제공되었습니다.\n우편함을 확인하세요.');
                    }
                  }

                  $scope.result = JSON.stringify(result, null, 2);
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