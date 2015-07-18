'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the bldrApp
 */
/**angular.module('bldrApp')
  .controller('CreateCtrl', function () {

  	var vm = this;

  	vm.a = 'hi';

  });
*/

angular.module('bldrApp')
  .controller('CreateCtrl', function ($http, $window, $location, $scope) {
    

    var vm = this;
	var url = 'http://localhost:3000/api/';

	$scope.$on('$viewContentLoaded', function() {
      vm.initialize();
    });

	vm.insert = function(formData){

		var url = 'http://localhost:8000/auth/signup';
		$http
		.post(url , {
			name : formData.name, 
			location : formData.location,
			description : formData.description,
			participants : formData.participants
			//image : formData.image
			
		})
	};

		// alert("hello");

	  var map;
      var marker;

      // vm.loadScript = function(){

      //   var script = document.createElement('script');
      //   script.type = 'text/javascript';
      //   script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize';
      //   document.body.appendChild(script);

      // }

      vm.initialize = function () {
        var mapOptions = {
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        console.log($('#map-canvas'));
        map = new google.maps.Map($('#map-canvas'), mapOptions);
        // This event listener will call addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          // console.log(event.latLng);
          addMarker(event.latLng);
        });

        var pos;
        
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(location){
              pos = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
              map.setCenter(pos); 
              marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP,
                title: 'Pin by your current location'
              });
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
        marker = new google.maps.Marker({
          position: pos,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Pin by default location: center of Boston'
        });
      };

	  vm.addMarker = function(location) {
	    marker.setPosition(location);
	    if (marker.getAnimation() != null) {
	      marker.setAnimation(null);
	    } else {
	      marker.setAnimation(google.maps.Animation.BOUNCE);
	      setTimeout(function(){ marker.setAnimation(null); }, 750);
	    }
	    $http
	    	.post('http://maps.googleapis.com/maps/api/geocode/json', {
		    	latlng: location.A + ',' + location.F,
		    	sensor: true
	    	})
	    	.success(function(data){
	    		vm.formData.location.address = data.results[0].formatted_address;
	    		vm.formData.location.latitude = location.A;
	    		vm.formData.location.longitude = location.F;
	    		// console.log(data.results[0].formatted_address);
	    	});
	    // var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.A + "," + location.F + "&sensor=true";
	    // $.ajax({
	    //   type: "POST",
	    //   url: url,
	    //   dataType: "json",
	    //   success:function(data) {
	    //     console.log(data.results[0].formatted_address);
	    //   }
	    // });
      }

    // window.onload = loadScript;

  });