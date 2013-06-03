'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('bamn', ['bamn.filters', 'bamn.services', 'bamn.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/register', {templateUrl: 'partials/user/registerUser', controller: RegisterCtrl})
    .when('/login', {templateUrl: 'partials/user/login', controller: LoginCtrl})
    //Add all other routes here
    .otherwise({redirectTo: '/register'});
    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);

//handle cookies, at the time of creation
//ngCookies did not support adding expiration
//so use our own cookie factory
app.factory('bamnCookies', function(){
    return {
        createCookie: function(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else {var expires = "";}
            document.cookie = name+"="+value+expires+"; path=/";
        },
        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        eraseCookie: function(name) {
            createCookie(name,"",-1);
        }
    }               
});