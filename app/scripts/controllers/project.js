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
  	var vm = this;
    vm.id = $routeParams.id;
    var baseUrl = 'http://localhost:3000/api/';

    $scope.$on('$viewContentLoaded', function() {
      vm.load();
    });

	  vm.load = function() {
      $http.get(baseUrl + 'projects/' + vm.id)
  	    .success(function (data) {
  	      vm.projectData = data;
  	    });
    }

    vm.addParticipant = function() {
      if(vm.participantToAdd === undefined || vm.participantToAdd === '') {
        Materialize.toast('Please enter a name');
      }
      else {
        $http
          .put(baseUrl + 'addparticipant', {
            id: vm.id,
            participant: vm.participantToAdd
          })
          .success(function(data){
            Materialize.toast(data.message, 2000);
            vm.load();
          });
      }
    }

    $(document).ready(function(){
      var options = [
        {selector: '.class', offset: 200, callback: 'globalFunction()' },
        {selector: '.other-class', offset: 200, callback: 'globalFunction()'},
        {selector: '#staggered-test', offset: 205, callback: 'Materialize.toast("Please continue scrolling!", 1500 )' },
        {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
        {selector: '#image-test-1', offset: 0, callback: 'Materialize.fadeInImage("#image-test-1")' },
        {selector: '#image-test-2', offset: 0, callback: 'Materialize.fadeInImage("#image-test-2")' },
        {selector: '#image-test-3', offset: 0, callback: 'Materialize.fadeInImage("#image-test-3")' },
        {selector: '#image-test-4', offset: 0, callback: 'Materialize.fadeInImage("#image-test-4")' },
        {selector: '#image-test-5', offset: 0, callback: 'Materialize.fadeInImage("#image-test-5")' },
        {selector: '#image-test-6', offset: 0, callback: 'Materialize.fadeInImage("#image-test-6")' },

      ];
      $('.modal-trigger').leanModal();
      Materialize.scrollFire(options);
    });


  });