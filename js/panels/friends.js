(function() {
    var app = angular.module("friends", ['simulator-navigation']);

    app.directive("friendsPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/friends.html",
            controller: function() {

            },
            controllerAs:"friendsPanelCtrl"
        }
    });
})();