// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular");

var app = angular.module("olympics-table", []);

app.controller("OlympicsController", ["$scope", "$filter", function($scope, $filter) {
  $scope.all = olympicsData;
  $scope.length = $scope.all.length;
  $scope.tooltip = {};

  $scope.headers = [
    { title: "Name", short: "last", medal: "" },
    { title: "Sport", short: "sport", medal: "" },
    { title: "Country", short: "country", medal: "" },
    { title: "Competed", short: "years_shortened", medal: "" },
    { title: "Affiliation", short: "affiliation", medal: "" },
    { title: "Gold", short: "gold", medal: "medal" },
    { title: "Silver", short: "silver", medal: "medal" },
    { title: "Bronze", short: "bronze", medal: "medal" }
  ];

  $scope.selected = $scope.headers[0];
  $scope.sortOrder = -1;

  var prefilter = $filter("filter");

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
      if (typeof a == "string") a = a.toLowerCase();
      b = b[header.short];
      if (typeof b == "string") b = b.toLowerCase();

      if (a > b) {
        return 1 * $scope.sortOrder;
      } else if (a < b) {
        return -1 * $scope.sortOrder;
      } else if (a == b) {
        return 0;
      }
    });

    $scope.index = 0;
  };

  $scope.index = 0;

  $scope.advance = function(direction) {
    if (direction < 0 && $scope.index <= 0) return;
    if (direction > 0 && ($scope.index + 15) >= $scope.length) return;
    $scope.index += (15 * direction);
  }

  $scope.$watch("searchText", function() {
    $scope.index = 0;
    $scope.length = prefilter($scope.all, $scope.searchText).length;
  });
  $scope.sortTable($scope.selected);

  $scope.round = function(num) {
    return Math.ceil(num)
  };

  $scope.showTooltip = function(athlete, medal) {
    var name = athlete.first + " " + athlete.last;
    if (medalData[name] && medalData[name][medal]) {
      $scope.tooltip.athlete = name;
      $scope.tooltip.medal = medal;
      $scope.tooltip.data = medalData[name][medal];
    } else {
      $scope.tooltip = {};
    }
  }

  var tooltip = document.querySelector(".tooltip");

  document.body.addEventListener('mousemove', function(e) {
    // if (document.querySelector(".hover")) document.querySelector(".hover").classList.remove("hover");
    if (e.target.classList.contains("medal") && e.target.innerHTML > 0) {
      $scope.left = e.clientX;
      $scope.top = e.clientY;
      $scope.$apply();
      // e.target.classList.add("hover");
      tooltip.classList.remove("hide");
    } else {
      tooltip.classList.add("hide");
    }
  });
}]);



