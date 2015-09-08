(function() {
    var app = angular.module('simulator-navigation', []);

    app.controller('NavigationController', function() {
        this.path = 'hub';
        this.selectMenu = function selectMenu(path) {
            this.path = path;
        };
        this.isSelected = function isSelected(path) {
            return this.path === path;
        };
    });
})();