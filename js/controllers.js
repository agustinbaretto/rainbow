angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', '79a4cc625c1b8c577a215fa9ae661ded')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  //Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    //$scope.getLoginStatus();
  });
 
  //Form data for the login modal
  $scope.loginData = {};
  //$scope.user = new Parse.User();
alert("h1!");
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
alert("h2!");
  $scope.login = function() {
    $scope.modal.show();
  };
alert("h3!");  

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
alert("h4!");  
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
alert("h5!");  
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
  alert("h6!");
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
  alert("h7!");
  $scope.firstLogin = function() {
    $scope.fbLogin();
    $scope.modal.hide();
  };
  alert("h8!");
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
  alert("ho!");
})

////////////////////////////////////////////////////////////////////////////////

.controller('RainbowCtrl', function($scope, $location, Weather) {
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
        //alert('Failed to create new object, with error code: ' + error.message);
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
    var config = {
        "type": "serial",
    	  "theme": "light",
        "pathToImages": "https://www.amcharts.com/lib/3/images/",
        "dataProvider": [],
        "balloon": {
          "cornerRadius": 6
        },
        "valueAxes": [{
          "arousal": "",
          "axisAlpha": 0
        }],
        "graphs": [{
          "bullet": "square",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 1,
          "fillAlphas": 0.3,
          "fillColorsField": "lineColor",
          "legendValueText": "[[value]]",
          "lineColorField": "lineColor",
          "title": "arousal",
          "valueField": "arousal"
        }],
        "chartScrollbar": {},
        "chartCursor": {
          "categoryBalloonDateFormat": "YYYY MMM DD",
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "date",
        "categoryAxis": {
          "dateFormats": [{
            "period": "DD",
            "format": "DD"
          }, {
            "period": "WW",
            "format": "MMM DD"
          }, {
            "period": "MM",
            "format": "MMM"
          }, {
            "period": "YYYY",
            "format": "YYYY"
          }],
          "parseDates": true,
          "autoGridCount": false,
          "axisColor": "#555555",
          "gridAlpha": 0,
          "gridCount": 50
        }
      };
    var moodColor = Parse.Object.extend("moodColor");
    var query = new Parse.Query(moodColor);
      query.ascending("lastUpdate");  //specify sorting
      query.limit(30);
      query.equalTo("user", Parse.User.current());
    
    query.find({
       success:function(results) { 
           $scope.$apply(function() {
              var index = 0;
              var Arrlen=results.length ;
    
              for (index = 0; index < Arrlen; ++index) {
                    var obj = results[index];
                    config.dataProvider.push({ 
                      arousal :  obj.get('arousal'),
                      date: obj.get('lastUpdate'),//updatedAt,
                      lineColor: obj.get('color')
                    });
              }
              var chart = AmCharts.makeChart("chartdiv", config);
          });     
      },
      error:function(error) {
            console.log("Error retrieving history!");
      }
    }); //end query.find

  
});
