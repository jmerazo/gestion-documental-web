(function () {
    'use strict';
    angular
        .module('app.radicacion')
        .factory('RadicaEntrada', RadicaEntrada);
    RadicaEntrada.$inject = ['API_URL_SERV', '$http', '$q'];

    function RadicaEntrada(API_URL_SERV, $http, $q) {

        var self = {
            loading: false,
            add: function (datos) {
                var d = $q.defer();
                $http.put(API_URL_SERV + 'radicacion/radicar/saveEntrada', datos).then(function (results) {
                    d.resolve(results.data);
                }, function (err) {
                    d.reject(err);
                });
                return d.promise;
            }
        };
        return self;
    }
}

)();