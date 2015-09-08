(function() {
    var app = angular.module("hub", ['simulator-navigation']);

    var menus = [
        { key:"player", caption:"Player", icon:"glyphicon glyphicon-user" },
        { key:"inventory", caption:"Inventory", icon:"glyphicon glyphicon-inbox"},
        { key:"friends", caption:"Friends", icon:"glyphicon glyphicon-heart"},
        { key:"in_app_purchase", caption:"In-app Purchase", icon:"glyphicon glyphicon-shopping-cart"},
        { key:"rankings", caption:"Rankings", icon:"glyphicon glyphicon-signal"},
        { key:"mailbox", caption:"Mailbox", icon:"glyphicon glyphicon-envelope"},
        { key:"forums", caption:"Forums", icon:"glyphicon glyphicon-tent"},
        { key:"play_game", caption:"Play Game", icon:"glyphicon glyphicon-knight"},
        { key:"item_explorer", caption:"Item Explorer", icon:"glyphicon glyphicon-book"},
        { key:"run_script", caption:"Run Script", icon:"glyphicon glyphicon-expand"},
        { key:"chat", caption:"Chat", icon:"glyphicon glyphicon-cutlery"},
    ];

    app.directive("hubPanel", function() {
        return {
            restrict:"E",
            templateUrl:"views/panels/hub.html",
            controller: function() {
                this.menus = menus;
            },
            controllerAs:"hubPanelCtrl"
        }
    });
})();