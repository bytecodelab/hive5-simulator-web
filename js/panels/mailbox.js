(function() {
    var app = angular.module("mailbox", ['simulator-navigation']);

    app.directive("mailboxPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/mailbox.html",
            controller: function() {

            },
            controllerAs:"mailboxPanelCtrl"
        }
    });
})();