(function() {
    var app = angular.module("rankings", ['simulator-navigation']);

    app.directive("rankingsPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/rankings.html",
            controller: function($scope, $q) {
              $scope.leaderboardKey = "weekly_ranking";
              $scope.leaderboardRankMin = "1";
              $scope.leaderboardRankMax = "100";

              this.refreshRankings = function() {
                $scope.scores = [];


                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function(result){
                  $scope.scores = result;
                }, function (reason) {
                  $scope.scores = [];

                  alert(reason);
                });

                var p = Hive5.Leaderboard.listScores($scope.leaderboardKey, $scope.leaderboardRankMin, $scope.leaderboardRankMax);
                p.then(function(response) {
                  var jsonData = JSON.parse(response.raw);
                  deferred.resolve(jsonData.scores);
                });
              };
            },
            controllerAs:"rankingsPanelCtrl"
        }
    });
})();