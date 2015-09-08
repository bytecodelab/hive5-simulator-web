(function() {
    var app = angular.module("hub", ['simulator-navigation']);

    var menus = [
        { key:"player", caption:"Player", icon:"glyphicon glyphicon-cloud"},
        { key:"inventory", caption:"Inventory", icon:"glyphicon glyphicon-cloud"},
        { key:"friends", caption:"Friends", icon:""},
        { key:"in_app_purchase", caption:"In-app Purchase", icon:""},
        { key:"rankings", caption:"Rankings", icon:""},
        { key:"mailbox", caption:"Mailbox", icon:""},
        { key:"forums", caption:"Forums", icon:""},
        { key:"play_game", caption:"Play Game", icon:""},
        { key:"item_explorer", caption:"Item Explorer", icon:""},
        { key:"run_script", caption:"Run Script", icon:""},
        { key:"chat", caption:"Chat", icon:""},
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