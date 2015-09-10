(function() {
    var app = angular.module("play-game", ['simulator-navigation']);

    app.directive("playGamePanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/play-game.html",
            controller: function() {

            },
            controllerAs:"playGamePanelCtrl"
        }
    });
})();