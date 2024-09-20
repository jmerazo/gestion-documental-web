angular.module('app.core_gd').service('Dashboards', function($http) {
    this.fnGetData = function(endpoint) {
        return $http.get(endpoint);
    };
});
