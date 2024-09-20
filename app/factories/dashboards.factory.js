(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('Dashboards', Dashboards);

    Dashboards.$inject = ['API_URL_SERV', '$http', '$q'];

    function Dashboards(API_URL_SERV, $http, $q) {
        var self = {
            fnGetData: function (wsEndPoint) {
                var d = $q.defer();
                $http.get(API_URL_SERV + wsEndPoint).then(function (results) {
                    d.resolve(results.data);
                });
                return d.promise;
            }
        };
        return self;
    }
})();
