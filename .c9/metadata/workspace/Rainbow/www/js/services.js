{"filter":false,"title":"services.js","tooltip":"/Rainbow/www/js/services.js","undoManager":{"mark":9,"position":9,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":65,"column":39},"action":"insert","lines":["'use strict';","","var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', ","  function($q, $resource, $http, FORECASTIO_KEY) {","  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';","","  var weatherResource = $resource(url, {","    callback: 'JSON_CALLBACK',","  }, {","    get: {","      method: 'JSONP'","    }","  });","","  return {","    //getAtLocation: function(lat, lng) {","    getCurrentWeather: function(lat, lng) {","      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');","    }","  }","}];","","angular.module('starter.services', ['ngResource'])",".factory('Cities', function() {","var cities = [","    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },","    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },","    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },","    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },","    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },","    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },","    { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }","  ];","","  return {","    all: function() {","      return cities;","    },","    get: function(cityId) {","      // Simple index lookup","      return cities[cityId];","    }","  }","}).","factory('DataStore', function() {","    //create datastore with default values","    var DataStore = {","        city:       'Miami',","        latitude:   25.7877,","        longitude:  80.2241 };","","    DataStore.setCity = function (value) {","       DataStore.city = value;","    };","","    DataStore.setLatitude = function (value) {","       DataStore.longitude = value;","    };","","    DataStore.setLongitude = function (value) {","       DataStore.longitude = value;","    };","","    return DataStore;","})",".factory('Weather', forecastioWeather);"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":0},"end":{"row":64,"column":2},"action":"remove","lines":["factory('DataStore', function() {","    //create datastore with default values","    var DataStore = {","        city:       'Miami',","        latitude:   25.7877,","        longitude:  80.2241 };","","    DataStore.setCity = function (value) {","       DataStore.city = value;","    };","","    DataStore.setLatitude = function (value) {","       DataStore.longitude = value;","    };","","    DataStore.setLongitude = function (value) {","       DataStore.longitude = value;","    };","","    return DataStore;","})"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":3},"end":{"row":44,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":23,"column":0},"end":{"row":43,"column":3},"action":"remove","lines":[".factory('Cities', function() {","var cities = [","    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },","    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },","    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },","    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },","    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },","    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },","    { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }","  ];","","  return {","    all: function() {","      return cities;","    },","    get: function(cityId) {","      // Simple index lookup","      return cities[cityId];","    }","  }","})."]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":50},"end":{"row":23,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":23,"column":39},"action":"remove","lines":["'use strict';","","var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', ","  function($q, $resource, $http, FORECASTIO_KEY) {","  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';","","  var weatherResource = $resource(url, {","    callback: 'JSON_CALLBACK',","  }, {","    get: {","      method: 'JSONP'","    }","  });","","  return {","    //getAtLocation: function(lat, lng) {","    getCurrentWeather: function(lat, lng) {","      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');","    }","  }","}];","","angular.module('starter.services', ['ngResource'])",".factory('Weather', forecastioWeather);"]},{"start":{"row":0,"column":0},"end":{"row":65,"column":39},"action":"insert","lines":["'use strict';","","var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', ","  function($q, $resource, $http, FORECASTIO_KEY) {","  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';","","  var weatherResource = $resource(url, {","    callback: 'JSON_CALLBACK',","  }, {","    get: {","      method: 'JSONP'","    }","  });","","  return {","    //getAtLocation: function(lat, lng) {","    getCurrentWeather: function(lat, lng) {","      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');","    }","  }","}];","","angular.module('starter.services', ['ngResource'])",".factory('Cities', function() {","var cities = [","    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },","    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },","    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },","    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },","    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },","    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },","    { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }","  ];","","  return {","    all: function() {","      return cities;","    },","    get: function(cityId) {","      // Simple index lookup","      return cities[cityId];","    }","  }","}).","factory('DataStore', function() {","    //create datastore with default values","    var DataStore = {","        city:       'Miami',","        latitude:   25.7877,","        longitude:  80.2241 };","","    DataStore.setCity = function (value) {","       DataStore.city = value;","    };","","    DataStore.setLatitude = function (value) {","       DataStore.longitude = value;","    };","","    DataStore.setLongitude = function (value) {","       DataStore.longitude = value;","    };","","    return DataStore;","})",".factory('Weather', forecastioWeather);"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":0},"end":{"row":64,"column":2},"action":"remove","lines":["factory('DataStore', function() {","    //create datastore with default values","    var DataStore = {","        city:       'Miami',","        latitude:   25.7877,","        longitude:  80.2241 };","","    DataStore.setCity = function (value) {","       DataStore.city = value;","    };","","    DataStore.setLatitude = function (value) {","       DataStore.longitude = value;","    };","","    DataStore.setLongitude = function (value) {","       DataStore.longitude = value;","    };","","    return DataStore;","})"]}]}],[{"group":"doc","deltas":[{"start":{"row":24,"column":0},"end":{"row":44,"column":0},"action":"remove","lines":["var cities = [","    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },","    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },","    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },","    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },","    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },","    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },","    { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }","  ];","","  return {","    all: function() {","      return cities;","    },","    get: function(cityId) {","      // Simple index lookup","      return cities[cityId];","    }","  }","}).",""]}]}],[{"group":"doc","deltas":[{"start":{"row":23,"column":0},"end":{"row":24,"column":0},"action":"remove","lines":[".factory('Cities', function() {",""]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":50},"end":{"row":23,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":22,"column":50},"end":{"row":22,"column":50},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1416636846435,"hash":"1b8975f6bf2af8853e120a703f33c5b731f563bc"}