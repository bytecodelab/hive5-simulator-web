(function(root) {
    var app = angular.module('simulator-navigation', []);

    app.controller('NavigationController', function($scope) {
        this.path = 'sign_in';
        this.selectMenu = function selectMenu(path) {
            if (Hive5.Auth.user == null) {
              if (path != 'hub'){
                alert('로그인이 필요합니다.');
              }
              this.path = 'sign_in';
            }
            else {
                this.path = path;
            }
        };
        this.isSelected = function isSelected(path) {
            return this.path === path;
        };
        this.isLoggedIn = function getIsLoggedIn() {
            return Hive5.Auth.user != null;
        };

        this.logOut = function logOut() {
          Hive5.Auth.user = null;
            var elem = angular.element(document.querySelector('[ng-app]'));
            var injector = elem.injector();
            var $rootScope = injector.get('$rootScope');

            $rootScope.$apply(function(){
              $rootScope.user = null;
              root.navigationService.selectMenu('sign_in');
            });
        };

        root.navigationService = this;

        //$scope.$on('navigateEvent', function(event, args) {
        //
        //});
    });
})(this);