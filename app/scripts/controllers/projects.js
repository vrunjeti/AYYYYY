'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the bldrApp
 */
angular.module('bldrApp')
  .controller('ProjectsCtrl', function ($http, $scope) {

    var vm = this;
    var baseUrl = 'http://localhost:3000/api/';
    var map;
    var markers_data = []
    var markers = [];
    var infowindow = new google.maps.InfoWindow();
    vm.showListView = false;
    vm.toggleName = 'List';

    $scope.$on('$viewContentLoaded', function() {
      $http
        .get(baseUrl + 'projects')
        .success(function (data) {
          vm.projectCollection = data;
          markers_data = data;
          vm.map_initialize();
        });

    });

    vm.toggleView = function(){
      vm.showListView = !vm.showListView;
      vm.toggleName = (vm.toggleName === 'List') ? 'Map' : 'List';
    }

    vm.map_initialize = function() {
      var mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      //add markers to the map. also add them to the markers array
      markers_data.forEach(function(json_obj) {
        vm.addMarker(json_obj);
      });

      //add marker listners
      for (var i = 0, m; m = markers[i]; i++) {
        //mouseover listener
        google.maps.event.addListener(m, 'mouseover', function(e) {
          var contentString = '<div id="content">' +
                                '<h5> Project Name: ' + this.project_info.project_title + '</h5>' +
                                '<h5> Description: </h5>' +
                                  '<p> ' + this.project_info.project_description + '</p>' +
                                '<p> <a href="#/projects/' +this.project_info.project_id + '"><input type="button" Value="More" /></a>' +
                                '</p>' +
                              '</div>';
          infowindow.setContent(contentString);
          console.log(infowindow);
          infowindow.open(map, this);
        });
        //mouseclick listener
        google.maps.event.addListener(m, 'click', function(e) {
          var contentString = '<div id="content">' +
                                '<h5> Project Name: ' + this.project_info.project_title + '</h5>' +
                                '<h5> Description: </h5>' +
                                  '<p> ' + this.project_info.project_description + '</p>' +
                                '<p> <a href="#/projects/' +this.project_info.project_id + '"><input type="button" Value="More" /></a>' +
                                '</p>' +
                              '</div>';
          infowindow.setContent(contentString);
          console.log(infowindow);
          infowindow.open(map, this);
        });
        //mouseout listener
        google.maps.event.addListener(m, 'mouseout', function(e) {
          if(infowindow) {
             setTimeout(function () { infowindow.close(); }, 2000);
          }
        });
      }

      var pos;

      //if the user allows us to access his/her location
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(location){
            pos = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
            map.setCenter(pos);
          },
          function() {
            location_init_fail();
          });
      } else {
        location_init_fail();
      }

    };

    vm.location_init_fail = function() {
      var pos = new google.maps.LatLng(42.35949527013756, -71.0592269897461);
      map.setCenter(pos);
    };

    vm.addMarker = function(event) {
      if(event && event.location) {
        var location = new google.maps.LatLng(event.location.latitude,event.location.longitude);
        var marker = new google.maps.Marker({
          position: location,
          clickable: true,
          animation: google.maps.Animation.DROP,
          project_info: {
            project_title: event.name? event.name:"",
            project_description: event.description? event.description:"",
            project_id : event._id
          },
        });

        if(map.getBounds()!=null) {
          if(map.getBounds().contains(location)) {
            marker.setMap(map);
            console.log(marker.position);
          }
        }
        else{
          google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
            if(map.getBounds().contains(location)) {
              marker.setMap(map);
              console.log(marker.position);
            }
          });
        }

        markers.push(marker);
      }
    };
    vm.refreshMap = function() {
      if(markers_data!=null) {
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];
        markers_data.forEach(function(json_obj) {
          vm.addMarker(json_obj);
        });
      }
    }  

  });
