(function() {
    var app = angular.module('simulator-navigation', []);

    app.controller('NavigationController', function() {
        this.path = 'sign_in';
        this.selectMenu = function selectMenu(path) {
            this.path = path;
        };
        this.isSelected = function isSelected(path) {
            return this.path === path;
        };
    });
})();