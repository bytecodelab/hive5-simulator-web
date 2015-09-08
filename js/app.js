(function() {
    var app = angular.module("simulator", ['simulator-navigation','hub', 'player']);

    app.controller("SomeController", function() {
       this.people = [
           { name: "Gilbok Lee"},
            {name: "Harry Jung"}
       ];
    });
})();