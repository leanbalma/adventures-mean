'use strict';

/**
 * @ngdoc service
 * @name frontendApp.ServerCommunication
 * @description
 * # ServerCommunication
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('ServerCommunication', function ($http, $q) {
    var serverURL = 'http://localhost:3000';

    var getContactsList = function() {
      var defer = $q.defer();

      $http.get(serverURL + '/contacts-list').success( function(response) {
        // console.log(response);
        defer.resolve(response);
      });

      return defer.promise;
    };

    var addContact = function(contact) {
      var defer = $q.defer();

      $http.post(serverURL + '/contacts-list', contact).success( function(response) {
        console.log(response);
        defer.resolve(response);
      });

      return defer.promise;
    };

    var removeContact = function(contact_id) {
      var defer = $q.defer();

      $http.delete(serverURL + '/contacts-list/' + contact_id).success( function(response) {
        console.log(response);
        defer.resolve(response);
      });

      return defer.promise;
    };

    return {
      getContactsList: getContactsList,
      addContact: addContact,
      removeContact: removeContact
    };


  });
