var app = angular.module('myApp.calenderService', [])

/*
|--------------------------------------------------------------------------
| FirebaseDataFactory
|--------------------------------------------------------------------------
|
| Factory to help us do firebase related methods to GET, POST, PUT, DELETE
| data on the server.
|
*/

.factory('FirebaseFactory', ['$http', '$q', 'Firebase', 'FBURL', function($http, $q, Firebase, FBURL) {
    
    var ref = new Firebase(FBURL).child('events');
    var factory = {};
    var deferred = $q.defer();

    factory.get = function() {
        $http.get(FBURL+'/events.json', function(events) {
            deferred.resolve(events);
        });
        return deferred.promise;
    };

    factory.post = function(event) {
        var newChildEvent = ref.push();
        newChildEvent.set(event);
    };

    factory.update = function(event) {
        
    };

    return factory;
}]);