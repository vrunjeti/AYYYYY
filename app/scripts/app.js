'use strict';

/**
 * @ngdoc overview
 * @name bldrApp
 * @description
 * # bldrApp
 *
 * Main module of the application.
 */
angular
  .module('bldrApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        controllerAs: 'create'
      })
      .when('/projects/:id', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
