(function() {
    var app = angular.module("chat", ['simulator-navigation']);

    app.directive("chatPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/chat.html",
            controller: function() {

            },
            controllerAs:"chatPanelCtrl"
        }
    });
})();