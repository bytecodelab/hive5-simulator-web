(function() {
    var app = angular.module("forums", ['simulator-navigation']);

    app.directive("forumsPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/forums.html",
            controller: function() {

            },
            controllerAs:"forumsPanelCtrl"
        }
    });
})();