'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the bldrApp
 */
angular.module('bldrApp')
  .controller('ProjectsCtrl', function ($http) {

    var vm = this;
    var baseUrl = 'http://localhost:3000/api/';

    //vm.loadAll = function() {
      $http
        .get(baseUrl + 'projects')
        .success(function (data) {
          vm.projectCollection = data;
        });
    //};


  });
