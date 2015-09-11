(function(root) {
    var app = angular.module("mailbox", ['simulator-navigation']);

    root.mailboxService = {};

    app.directive("mailboxPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/mailbox.html",
          controller: function($scope, $q) {
            root.mailboxService = this;
            $scope.mailCount = 0;

            this.acceptReward = function (mailId) {
              var deferred = $q.defer();
              var promise = deferred.promise;
              promise.then(function(result){
                root.mailboxService.refreshMailbox();
              }, function (reason) {
                // nothing
              });

              var p = Hive5.Mail.acceptReward(mailId);
              p.then(function(response) {
                var jsonData = JSON.parse(response.raw);
                if (jsonData.result_code != 0) {
                  alert(jsonData.result_message);
                  return;
                }
                var p2 = Hive5.Mail.delete(mailId);
                p2.then(function(response) {
                  var jsonData = JSON.parse(response.raw);
                  if (jsonData.result_code != 0) {
                    alert(jsonData.result_message);
                    return;
                  }
                  else {
                    deferred.resolve(jsonData);
                  }
                });

                alert('인벤토리를 확인하세요!');
              });
            };

            this.refreshMailbox = function() {
              this.refreshMailCount();
              this.refreshMails();
            };

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
                var jsonData = JSON.parse(response.raw);
                deferred.resolve(jsonData.mails);
              });
            };


          },
          controllerAs:"mailboxPanelCtrl"
        }
    });
})(this);