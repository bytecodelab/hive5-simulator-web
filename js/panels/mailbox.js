(function() {
    var app = angular.module("mailbox", ['simulator-navigation']);

    app.directive("mailboxPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/mailbox.html",
          controller: function($scope, $q) {
            $scope.mailCount = 0;

            this.refreshMailbox = function() {
              this.refreshMailCount();
              this.refreshMails();
            }

            this.refreshMailCount = function() {
              $scope.mailCount = 0;

              var deferred = $q.defer();
              var promise = deferred.promise;
              promise.then(function(result){
                $scope.mailCount = result;
              }, function (reason) {
                $scope.mailCount = 0;

                alert(reason);
              });

              var p = Hive5.Mail.count();
              p.then(function(response) {
                var jsonData = JSON.parse(response.raw);
                deferred.resolve(jsonData.count);
              });
            };

            this.refreshMails = function() {
              $scope.mails = [];


              var deferred = $q.defer();
              var promise = deferred.promise;
              promise.then(function(result){
                $scope.mails = result;
              }, function (reason) {
                $scope.mails = [];

                alert(reason);
              });

              var p = Hive5.Mail.list("dec", 0, 20);
              p.then(function(response) {
                alert(response.raw);
                var jsonData = JSON.parse(response.raw);
                deferred.resolve(jsonData.mails);
              });
            };
          },
            controllerAs:"mailboxPanelCtrl"
        }
    });
})();