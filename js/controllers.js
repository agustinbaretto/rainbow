angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', '79a4cc625c1b8c577a215fa9ae661ded')
.constant('GOOGLEAPI_KEY', '79a4cc625c1b8c577a215fa9ae661ded')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  //Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.getLoginStatus();
  });
  
  //Form data for the login modal
  $scope.loginData = {};
  $scope.user = new Parse.User();

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };
  

  $scope.getLoginStatus = function() {
    openFB.getLoginStatus(
      function(response) {
        if (response.status === 'connected') {
          console.log('FB logged');
          $scope.fbLogin();
        } else {
          console.log('need to login');
          $scope.login();
        }
      },{scope: 'email,publish_actions'}
    );
  };
  
  //Logs in to FB and returns user
  $scope.fbLogin = function() {
    openFB.login(
      function(response) {
        if (response.status === 'connected') {
          openFB.api({
              path: '/me',
              params: {fields: 'name,id'},
              success: function(res) {
                  $scope.$apply(function() {
                      $scope.user.set("username", res.name);
                      $scope.user.set("fbid", res.id);
                  });
                  $scope.parseLogin();
              },
              error: function(error) {
                  alert('Facebook error: ' + error.error_description);
              }
          });
        } else {
          alert('Facebook login failed');
        }
      },{scope: 'email,publish_actions'}
    );
  }
  
  // Open the login modal
  $scope.parseLogin = function() {
    Parse.User.logIn($scope.user.get("username"), $scope.user.get("fbid"), {
      success: function(user) {
        $scope.user = user;
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log("Parse login failed");
        $scope.parseSignup();
      }
    });
  };
  
  $scope.parseSignup = function() {
    $scope.user.set("password", $scope.user.get("fbid"));
    $scope.user.set("lastColor", Please.make_color({golden: true}));
     
    $scope.user.signUp(null, {
      success: function(user) {
        console.log("Parse signup success");
        $scope.user = user;
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  
  $scope.firstLogin = function() {
    $scope.fbLogin();
    $scope.modal.hide();
  };
  
  // Open the login modal
  $scope.doLogin = function() {
    $scope.user.set("username", $scope.loginData.username);
    $scope.user.set("password", $scope.loginData.password);

    //user.set("phone", "415-392-0202");
     
    $scope.user.signUp(null, {
      success: function(user) {
        $scope.user = user;
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
    $scope.modal.hide();
  };
})

////////////////////////////////////////////////////////////////////////////////

.controller('RainbowCtrl', function($scope, $location, Weather) {
  $scope.location = null;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.location = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  }
  $scope.mood = {valence:227, arousal:50};
  
  $scope.city  = "Rochester";
  var latitude  =  43.1558;
  var longitude = -77.6163;

  //call getCurrentWeather method in factory ‘Weather’
  Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
    $scope.mood.weatherSummary = resp.data.currently.summary;
    $scope.mood.clouds =  (resp.data.currently.cloudCover * 25)+5;
    $scope.mood.temperature =  resp.data.currently.temperature;
    //console.log('GOT CURRENT', $scope.current);
  }, function(error) {
    alert('Unable to get current conditions');
    console.error(error);
  });
    
  $scope.makeColor = function(mood) {
    var MoodColor = Parse.Object.extend("moodColor");
    var moodObj = new MoodColor();
    var scheme = Please.make_scheme({
        golden: false,
        h: 360 - mood.valence,
        s: mood.arousal/100,
        v: 1-(mood.clouds/100)
      },
      {
      	scheme_type: "monochromatic",
      	format: "hex"
    });
    moodObj.set("arousal", parseInt(mood.arousal));
    moodObj.set("valence", parseInt(mood.valence));
    moodObj.set("clouds", parseInt(mood.clouds));
    moodObj.set("temperature", parseInt(mood.temperature));
    moodObj.set("color", scheme[1]);
    moodObj.set("user", $scope.user);
    moodObj.set("location", $scope.location);
    moodObj.save(null, {
        success: function(moodColor) {
        // Execute any logic that should take place after the object is saved.
        //alert('New object created with objectId: ' + moodColor.id);
      },
        error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
    
    $scope.user.set("lastColor", scheme[1]);
    $scope.user.save(null, {
      success: function(user) {
        // Execute any logic that should take place after the object is saved.
        //alert('New object created with objectId: ' + user.id);
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
    $location.path('/app/profiles/'+$scope.user.id);
  };
})


////////////////////////////////////////////////////////////////////////////////


.controller('FriendsCtrl', function($scope) {
  var FBfriends = [];
  var appUsers = [];
  
  /*openFB.api({
      path: '/me',
      params: {fields: 'friends'},
      success: function(res) {
          $scope.$apply(function() {
              FBfriends = res.friends.data;
          });
      },
      error: function(error) {
          alert('Facebook error: ' + error.error_description);
      }
  });*/
  
  var data = window.localStorage.getItem('users');
  data = null;

  if (data != null )  {
      appUsers   = null;
      appUsers   = JSON.parse(data);
      console.log('using local storage');
   }
   else {
       var userObj = Parse.Object.extend("User");
       var query = new Parse.Query(userObj);
       query.descending("createdAt");  //specify sorting
      //query.limit(20);  //specify limit -- fetch only 20 objects

       query.find({
           success:function(results) { 
               $scope.$apply(function() {
                  var index =0;
                  var Arrlen=results.length ;

                  for (index = 0; index < Arrlen; ++index) {
                       var obj = results[index];
                        appUsers.push({ 
                          id :  obj.id,
                          name: obj.get('username'),
                          color: obj.get('lastColor')
                        });
                  }
                  window.localStorage.setItem('users', JSON.stringify(appUsers));
              });     
          },
          error:function(error) {
                console.log("Error retrieving friends!");
          }
        }); //end query.find
   }

  $scope.friends = appUsers;
})

////////////////////////////////////////////////////////////////////////////////


.controller('ProfileCtrl', function($scope, $stateParams) {
  var profileId = $stateParams.profileId;
  $scope.profile = {};
  var data = window.localStorage.getItem('profile'+profileId);
  data = null;

  if (data != null )  {
      $scope.profile = JSON.parse(data);
      console.log('using local storage');
   }
   else {
     var userObj = Parse.Object.extend("User");
     var query = new Parse.Query(userObj);
     query.limit(1);  //specify limit -- fetch only 20 objects
     query.get(profileId);
  
     query.find({
         success:function(results) { 
             $scope.$apply(function() {
                var obj = results[0];
                $scope.profile.id =  obj.id;
                $scope.profile.username =  obj.get('username');
                $scope.profile.color =  obj.get('lastColor');
                $scope.profile.fbid =  obj.get('fbid');
  
                window.localStorage.setItem('profile'+profileId, JSON.stringify($scope.profile));
            });     
        },
        error:function(error) {
              console.log("Error retrieving profile!");
        }
      }); //end query.find
   }
})

////////////////////////////////////////////////////////////////////////////////

.controller('HistoryCtrl', function($scope, $stateParams) {
    $scope.graph = {axis:"arousal"};
    $scope.config = null;
    $scope.config = {
        "type": "serial",
    	  "theme": "light",
        "pathToImages": "https://www.amcharts.com/lib/3/images/",
        "legend": {
            "align": "center",
            "useGraphSettings": true,
            "equalWidths": false,
            "valueAlign": "left",
            "valueWidth": 100
        },
        "dataProvider": [],
        "balloon": {
          "cornerRadius": 5
        },
        "valueAxes": [{
          "arousal": "",
          "axisAlpha": 0
        }, {
          "valence": "",
          "axisAlpha": 0
        }, {
          "clouds": "",
          "axisAlpha": 0
        }, {
          "background": "",
          "axisAlpha": 0
        }],
        "graphs": [{
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "legendValueText": "[[value]]",
          "lineColorField": "#FF6600",
          "lineThickness":5,
          "title": "arousal",
          "valueField": "arousal",
          "fillAlphas": 0.5,
          "fillColorsField": "lineColor"
        },{
          "bullet": "triangleUp",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "legendValueText": "[[value]]",
          "lineColorField": "#B0DE09",
          "lineThickness":5,
          "title": "valence",
          "valueField": "valence",
          "fillAlphas": 0.5,
          "hidden":true,
          "fillColorsField": "lineColor"
        },{
          "bullet": "square",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "legendValueText": "[[value]]",
          "lineColorField": "#FCD202",
          "lineThickness":5,
          "title": "clouds",
          "valueField": "clouds",
          "fillAlphas": 0.5,
          "hidden":true,
          "fillColorsField": "lineColor"
        }],
        "dataDateFormat" : "MMM DD",
        "chartCursor": {
          "categoryBalloonDateFormat": "MMM DD JJ:NN",
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "date",
        "categoryAxis": {
          "parseDates": true,
          "minPeriod" : "mm",
          "axisColor": "#555555",
          "gridAlpha": 0,
          "gridCount": 50
        }
      };
    var moodColor = Parse.Object.extend("moodColor");
    var query = new Parse.Query(moodColor);
      query.ascending("updatedAt");  //specify sorting
      query.limit(30);
      query.equalTo("user", Parse.User.current());
    
    query.find({
       success:function(results) { 
           $scope.$apply(function() {
              var index = 0;
              var Arrlen=results.length ;
    
              for (index = 0; index < Arrlen; ++index) {
                    var obj = results[index];
                    $scope.config.dataProvider.push({ 
                      arousal:parseInt((obj.get('arousal')-20)/0.6,10),
                      valence:parseInt((obj.get('valence')-90)/2.7,10),
                      temperature:parseInt(obj.get('temperature'),10),
                      clouds:parseInt(obj.get('clouds')*3.3,10),
                      date: obj.updatedAt,
                      background: 100,
                      lineColor: obj.get('color')
                    });
              }
              var chart = AmCharts.makeChart("chartdiv", $scope.config);
          });     
      },
      error:function(error) {
            console.log("Error retrieving history!");
      }
    }); //end query.find
  $scope.change = function() {
    if($scope.graph.axis == "arousal"){
      $scope.config.graphs[0].hidden = false;
      $scope.config.graphs[1].hidden = true;
      $scope.config.graphs[2].hidden = true;
    }
    if($scope.graph.axis == "valence"){
      $scope.config.graphs[0].hidden = true;
      $scope.config.graphs[1].hidden = false;
      $scope.config.graphs[2].hidden = true;
    }
    if($scope.graph.axis == "weather"){
      $scope.config.graphs[0].hidden = true;
      $scope.config.graphs[1].hidden = true;
      $scope.config.graphs[2].hidden = false;
    }
    var chart = AmCharts.makeChart("chartdiv", $scope.config);
  };
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      

/*
.controller('MapCtrl', function($scope, $ionicLoading) {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
  
  /*$scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });
  
  var moodColor = Parse.Object.extend("moodColor");
  var query = new Parse.Query(moodColor);
  query.exists("location");
  query.find({
    success:function(results) { 
      $scope.$apply(function() {
        var index = 0;
        var arrlen = results.length;
  
        for (index = 0; index < arrlen; ++index) {
          var obj = results[index];
          var moodOptions = {
            strokeWeight: 0,
            fillColor: obj.get('color'),
            fillOpacity: 0.8,
            map: $scope.map,
            center: new google.maps.LatLng(obj.get('location').latitude, obj.get('location').longitude),
            radius: 50
          };
          // Add the circle for this city to the map.
          moodCircle = new google.maps.Circle(moodOptions);
        }
        //window.localStorage.setItem('rainbowMap', JSON.stringify(rainbowMap));
      });     
    },
    error:function(error) {
      console.log("Error retrieving map colors!");
    }
  }); //end query.find

  var moodCircle;

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      $scope.map.setCenter(pos);
      var myLocation = new google.maps.Marker({
            position: pos,
            map: $scope.map,
            title: "My Location"
        });
    }, function() {
      $scope.handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    $scope.handleNoGeolocation(false);
  }

  $scope.handleNoGeolocation = function (errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }
  
    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };
  
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }*/
});
