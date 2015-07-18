'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the bldrApp
 */
angular.module('bldrApp')
  .controller('ProjectCtrl', function () {

    var vm = this;
    var baseUrl = 'still needs to be determined';

    vm.loadProject = function() {
      $http
        .get(baseUrl + 'getProject')
        .success(function (data) {
          vm.projectData = data;
        });
    };

  });
