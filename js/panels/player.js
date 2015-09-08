(function() {
    var app = angular.module("player", ['simulator-navigation']);

    app.directive("playerPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/player.html",
            controller: function() {

            },
            controllerAs:"playerPanelCtrl"
        }
    });
})();