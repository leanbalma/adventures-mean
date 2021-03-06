'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope, $http, ServerCommunication) {


    ServerCommunication.getContactsList().then( function(response) {
      $scope.contacts = response;
      console.log(response);
    });


    // Click events
    $scope.addContact = function() {
      ServerCommunication.addContact($scope.newContact).then( function(response) {
        $scope.contacts.push(response);
      });
    };

    $scope.removeContact = function(id) {
      ServerCommunication.removeContact(id).then( function(response) {
        ServerCommunication.getContactsList().then( function(response) {
          $scope.contacts = response;
        });

      });
    };

    $scope.editContact = function(id) {
      ServerCommunication.editContact(id).then( function(response) {
        $scope.newContact = response;
      });
    };

    $scope.updateContact = function() {
      ServerCommunication.updateContact($scope.newContact).then( function(response) {
        $scope.newContact = {};
        ServerCommunication.getContactsList().then( function(response) {
          $scope.contacts = response;
        });
      });
    };

  });
