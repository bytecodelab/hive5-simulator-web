(function(root) {
    root.userService = {};
    root.userService.updateUserIdentity = function updateUserIdentity(user) {
      var elem = angular.element(document.querySelector('[ng-app]'));
      var injector = elem.injector();
      var $rootScope = injector.get('$rootScope');

      $rootScope.$apply(function(){
        $rootScope.user = user;
      });
    };

    root.userService.updateUserInfo = function updateUserInfo(userInfo) {
      var elem = angular.element(document.querySelector('[ng-app]'));
      var injector = elem.injector();
      var $rootScope = injector.get('$rootScope');

      $rootScope.$apply(function(){
        $rootScope.userInfo = userInfo;
      });
    };

    var app = angular.module("simulator", ['simulator-navigation','hub', 'player', 'inventory', 'friends', 'in-app-purchase', 'rankings', 'mailbox', 'forums','play-game','item-explorer','run-script','chat']);

    Hive5.initialize(Hive5Config.host, Hive5Config.app_key, "testdevice4");

    app.controller('AuthController', function() {
      this.isLoggedIn = function getIsLoggedIn() {
        return app.user != null;
      };
    });

    app.controller("SomeController", function() {
       this.people = [
           { name: "Gilbok Lee"},
            {name: "Harry Jung"}
       ];
    });

    app.directive("signIn", function() {
      return {
        restrict:"E",
        templateUrl:"views/panels/sign-in.html",
        controller:function() {
          this.selectedTab = "guest";
          this.selectTab = function selectTab(key) {
            this.selectedTab = key;
          };
          this.isSelected = function isSelected(key) {
            return key === this.selectedTab;
          };

          this.signIn = function signIn() {
            var p = Hive5.Auth.logIn("web", "1.0.0", "ko-KR", "", "");
            p.then(function(response) {

              var p2 = Hive5.Script.runScript("getUser");
              p2.then(function(response2) {
                var jsonData = JSON.parse(response2.raw);
                var getUserResult = jsonData.call_return.user;
                root.userService.updateUserInfo(getUserResult);
              });

              var data = JSON.parse(response.raw);
              if (data.result_code == 0) //OK
              {
                root.userService.updateUserIdentity(data.user);
                root.navigationService.selectMenu('hub');
              }
            });
          };
        },
        controllerAs: "tab"
      }
    });
})(this);

