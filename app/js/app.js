'use strict';

angular.module('Authentication', []);
var directoryApp = angular.module('directoryApp', ['Authentication','ngRoute','ngCookies'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/login', {
        controller: 'LoginController',
        templateUrl: 'app/templates/login.html'
    }).
    when('/dirlist', {
        templateUrl: 'app/templates/dirList.html',
        controller: 'DirListController'
    }).
    when('/adddir', {
        templateUrl: 'app/templates/dirNew.html',
        controller: 'DirNewController'
    }).
    otherwise({
        redirectTo: '/dirlist'
    });
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
})

.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.admin = $cookieStore.get('admin') || {};
    //$rootScope.dataLoaded = true;
    if ($rootScope.admin.userData) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.admin.userData.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.admin.userData) {
            $location.path('/login');
        }
    });
}]);