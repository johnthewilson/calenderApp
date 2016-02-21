/**
 * Created by johnwilson on 2/20/16.
 */
angular.module('myApp.user', [])
.service('loggedUser', function () {
    return {
      set: function (user) {
          this.user = user;
      },
        get: function () {
            return this.user;
        }
    };
});