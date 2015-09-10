(function() {
    var app = angular.module("forums", ['simulator-navigation']);

    app.directive("forumsPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/forums.html",
          controller: function($scope, $q) {
            $scope.forumKey = "notice";
            $scope.threadCount = 0;

            this.refreshForum = function() {
              this.refreshForumCount();
              this.refreshThreads();
            }


            this.refreshForumCount = function() {
              $scope.threadCount = 0;


              var deferred = $q.defer();
              var promise = deferred.promise;
              promise.then(function(result){
                $scope.threadCount = result;
              }, function (reason) {
                $scope.threadCount = 0;

                alert(reason);
              });

              var p = Hive5.Forum.countThreads($scope.forumKey);
              p.then(function(response) {
                var jsonData = JSON.parse(response.raw);
                deferred.resolve(jsonData.count);
              });
            };

            this.refreshThreads = function() {
              $scope.threads = [];


              var deferred = $q.defer();
              var promise = deferred.promise;
              promise.then(function(result){
                $scope.threads = result;
              }, function (reason) {
                $scope.threads = [];

                alert(reason);
              });

              var p = Hive5.Forum.listThreads($scope.forumKey, "dec", 0, 20);
              p.then(function(response) {
                var jsonData = JSON.parse(response.raw);
                deferred.resolve(jsonData.threads);
              });
            };
          },
            controllerAs:"forumsPanelCtrl"
        }
    });
})();