angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('RainbowCtrl', function($scope, $ionicModal) {
  $scope.rainbow = function() {
    alert("hola");
  };
})

.controller('FriendsCtrl', function($scope) {
  $scope.friends = [
    { name: 'Katie', color: "#CC33FF", id: 1 },
    { name: 'Nishant', color: "#FFCC11", id: 2 },
    { name: 'Sang', color: "#FF3533", id: 3 },
    { name: 'Manuel', color: "#FFCC33", id: 4 },
    { name: 'Gus', color: "#CC1A33", id: 5 },
    { name: 'Ensham', color: "#111433", id: 6 }
  ];
})

.controller('FriendCtrl', function($scope, $stateParams) {
});
