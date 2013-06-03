'use strict';

/* Filters */

angular.module('bamn.filters', []).
  filter('interpolate', ['version', function(version) {
  	console.log("filter");
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
