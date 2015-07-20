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
    var baseUrl = 'http://45.55.77.223:3000/api/';

    $scope.$on('$viewContentLoaded', function() {
      vm.load();
    });

	  vm.load = function() {
      $http.get(baseUrl + 'projects/' + vm.id)
  	    .success(function (data) {
  	      vm.projectData = data;
          // vm.mapInit();
          vm.initialize_map();
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

    var map;
    vm.initialize_map = function() {
      var position = new google.maps.LatLng(vm.projectData.location.latitude, vm.projectData.location.longitude);
      var mapOptions = {
        zoom: 14
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      var options = {
        map: map,
        position: position
      };

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Hello World!'
      });

      map.setCenter(options.position);

    }

    $(document).ready(function(){
      $('.modal-trigger').leanModal();
      $('.slider').slider({
        full_width: true,
        indicators: true
      });
    });


  });