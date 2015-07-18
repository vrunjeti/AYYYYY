'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the bldrApp
 */
angular.module('bldrApp')
  .controller('ProjectCtrl', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    var baseUrl = 'http://localhost:3000/api/';

	  $http.get(baseUrl + 'projects/' + $scope.id)
	    .success(function (data) {
	      $scope.projectData = data;
	    });
  });
