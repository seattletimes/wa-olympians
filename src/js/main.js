// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular");

var app = angular.module("olympics-table", []);

app.controller("OlympicsController", ["$scope", function($scope) {
  $scope.all = olympicsData;

  $scope.headers = [
    { title: "Name", short: "athlete", medal: "" },
    { title: "Sport", short: "sport", medal: "" },
    { title: "Competed", short: "years", medal: "" },
    { title: "Birthplace", short: "birthplace", medal: "" },
    { title: "Gold", short: "gold", medal: "medal" },
    { title: "Silver", short: "silver", medal: "medal" },
    { title: "Bronze", short: "bronze", medal: "medal" }
  ];

  $scope.selected = $scope.headers[0];
  $scope.sortOrder = -1;

  $scope.sortTable = function(header) {
    if ($scope.selected == header) {
      $scope.sortOrder *= -1;
    } else {
      $scope.selected = header;
      if (header.short == "gold" || header.short == "silver" || header.short == "bronze") {
        $scope.sortOrder = -1;    
      } else {
        $scope.sortOrder = 1;        
      }
    }

    $scope.all.sort(function(a, b) {
      a = a[header.short];
      b = b[header.short];

      if (a > b) {
        return 1 * $scope.sortOrder;
      } else if (a < b) {
        return -1 * $scope.sortOrder;
      } else if (a == b) {
        return 0;
      }
    });
  };
  $scope.sortTable($scope.selected);
}]);