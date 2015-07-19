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

    vm.mapInit = function() {
      // console.log(vm.projectData);
      debugger;
      var pos = new google.maps.LatLng(vm.projectData.location.latitude, vm.projectData.location.longitude);
      map.setCenter(pos);
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        animation: google.maps.Animation.DROP
      });
    };

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
      $('.slider').slider({full_width: true});
    });


  });