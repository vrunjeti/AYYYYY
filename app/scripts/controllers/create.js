'use strict';

*
 * @ngdoc function
 * @name bldrApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the bldrApp
 
/*angular.module('bldrApp')
  .controller('CreateCtrl', function () {

  	var vm = this;

  	vm.a = 'hi';

  });
*/

angular.module('bldrApp')
  .controller('CreateCtrl', function ($http, $window, $location) {
    

    var vm = this;
	var url = 'http://localhost:8000/sql/';

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
  });