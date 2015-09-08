(function() {
    var app = angular.module("simulator", ['simulator-navigation','hub', 'player']);

    Hive5.initialize("http://alpha.hornet.hive5.io", "d8444735-15e3-4198-9179-102ba68776fc", "testdevice4");

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
              var data = JSON.parse(response.raw);

              var elem = angular.element(document.querySelector('[ng-app]'));
              var injector = elem.injector();
              var $rootScope = injector.get('$rootScope');

              $rootScope.$apply(function(){
                $rootScope.user = data.user;
              });
            });
          };
        },
        controllerAs: "tab"
      }
    });
})();