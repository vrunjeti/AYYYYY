'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the bldrApp
 */
angular.module('bldrApp')
  .controller('ProjectCtrl', function ($http, $routeParams) {

    var vm = this;
    vm.id = $routeParams.id;
    var baseUrl = 'http://localhost:3000/api/';

    vm.loadProject = function() {
      $http
        .get(baseUrl + 'projects/' + vm.id)
        .success(function (data) {
          vm.projectData = data;
        });
    };

  });
