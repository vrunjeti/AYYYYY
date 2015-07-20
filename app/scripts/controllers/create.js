'use strict';

/**
 * @ngdoc function
 * @name bldrApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the bldrApp
 */

angular.module('bldrApp')
  .controller('CreateCtrl', function ($http, $scope, $location) {

    var vm = this;
    vm.message = '';
  	var baseUrl = 'http://45.55.77.223:3000/api/';
    $('#upfile1').on('click', function() {
      $('#filUpload').trigger('click');
    });

    $(document).ready(function() {
      $('select').material_select();
    });

  	$scope.$on('$viewContentLoaded', function() {
      vm.map_initialize();
      vm.formData = {
      	location: {
      		latitude: 0,
      		longitude:0,
      		address:'',
      	},
        category: "",
        images: []
      };
    });

    $scope.fileNameChanged = function(el) {
    	var reader = new FileReader();
    	reader.onload = function(e) {
    		var url = 'https://api.cloudinary.com/v1_1/ayyyyy/image/upload';
    		var timestamp = new Date().getTime();
    		var secret = 'J6IAdyDWkDty8vNCqYKfpEOkpsA';
    		var payload = {
    			file: e.target.result,
    			api_key: '421528816292945',
    			timestamp: timestamp,
    			signature: CryptoJS.SHA1('format=jpeg&timestamp=' + timestamp + secret).toString(CryptoJS.enc.Hex),
    			resource_type: 'image',
    			format: 'jpeg'
    		};
    		$http.post(url, payload).success(function (data) {
    			vm.formData.images.push(data.secure_url);
    			// $('#appendImage').append('<div class="col s3 span s3"><img src="' + data.secure_url + '"></img></div>');
    		  // alert(data.secure_url);
          // $scope.$apply();
        });
    	};
    	for (var iter = 0; iter < el.files.length ; iter ++ ) {
    		reader.readAsDataURL(el.files[0]);
    	}
    };

  	vm.insert = function(formData){
  		var data = {
  			name : formData.name,
  			location : formData.location,
  			description : formData.description,
        category: formData.category,
  			images : formData.images
  		};
  		$http.post(baseUrl + 'projects' , data).success(function(data) {
        if (data.message === 'Validation failed') {
          Materialize.toast('Please fill out all the required fields!', 1500);
        }
        else {
          $location.path('/projects/' + data.data._id);
        }
      });
  	};

	  var map;
    var marker;

    vm.map_initialize = function () {
      var mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      google.maps.event.addListener(map, 'click', function(event) {
        vm.addMarker(event.latLng);
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
      vm.formData.location.latitude = location.A;
  		vm.formData.location.longitude = location.F;
	    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.A + "," + location.F + "&sensor=true";
	    $.ajax({
	      type: "POST",
	      url: url,
	      dataType: "json",
	      success:function(data) {
	        vm.formData.location.address = data.results[0].formatted_address;
	        $("#location_label").addClass('active');
	        $scope.$apply();
	      }
	    });
     };

     vm.populateImages = function() {
      vm.formData.images = [
        'http://images.medicaldaily.com/sites/medicaldaily.com/files/2013/08/04/0/62/6259.jpg',
        'http://i.dailymail.co.uk/i/pix/2014/10/06/1412613364603_wps_17_SANTA_MONICA_CA_AUGUST_04.jpg',
        'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'
      ];
     }

  });

