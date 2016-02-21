(function(angular) {
    "use strict";

    var app = angular.module('myApp.calender', ['ngRoute', 'mwl.calendar', 'ui.bootstrap', 'myApp.calenderService']);
    console.log(app);
    app.controller('CalenderCtrl', ['$scope', 'moment', 'user', '$firebaseArray', 'Firebase', 'FBURL', '$q', function($scope, moment, user, $firebaseArray, Firebase, FBURL, $q) {

        var ref = new Firebase(FBURL).child('events'),
            deferred = $q.defer(),
            $firebase = $firebaseArray(ref),
            self = this;

        $scope.user = user;

        // setup state
        $scope.events = $firebaseArray(ref);
        $scope.calendarView = 'month';
        $scope.viewDate = new Date();
        $scope.isCellOpen = true;
        
        $firebase.$loaded().then(function(data) {
            self.events = $firebase;
        });
        
        // view events
        $scope.eventPost = function() {
            var startDate=JSON.stringify(moment().startOf('day').add(19, 'hours').toDate());
            var event = {
                title: 'EXERCISE+WORK+CLEAN+CODE',
                type: 'important',
                startsAt: moment().startOf('day').add(19, 'hours').toDate(),
                endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                recursOn: 'year',
                draggable: true,
                resizable: true,
                userId: user.uid
            };
            
            $firebase.$add(event).then(function(ref) {
                self.events = $firebase;
            });
        };
        $scope.checkUser= function(event){
            //console.log(event.userId === user.uid);
            return event.userId === user.uid;
        };
        $scope.eventUpdate = function(event) {
            console.log(event);
        };

        $scope.eventClicked = function(event) {
            alert.show('Clicked', event);
        };

        $scope.eventEdited = function(event) {
            alert.show('Edited', event);
        };

        $scope.eventDeleted = function(event) {
            alert.show('Deleted', event);
        };

        $scope.eventTimesChanged = function(event) {
            alert.show('Dropped or resized', event);
        };

        $scope.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        //Three way data Binding
        //events.$bindTo($scope,'events');

        //   $scope.newEvent={
        //       title:'',
        //       start:''
        //   };
        //
        //    $scope.addEvent= function(){
        //        events.$push($scope.newEvent);
        //    }
        //
    }]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/calender', {
            templateUrl: 'calender/calender.html',
            controller: 'CalenderCtrl as self',
            resolve: {
                user: ['Auth', '$rootScope', function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    }]);

})(angular);
