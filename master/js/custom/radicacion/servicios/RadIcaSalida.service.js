(function () {
        'use strict';
        angular
            .module('app.radicacion')
            .factory('RadSalida', RadSalida);
        RadSalida.$inject = ['API_URL_SERV', '$http', '$q'];

        function RadSalida(API_URL_SERV, $http, $q) {

            var self = {
                loading: false,
                add: function (datos) {
                    var d = $q.defer();
                    $http.put(API_URL_SERV + 'radicacion/radicar/saveSalida', datos).then(function (results) {
                        d.resolve(results.data);
                    }, function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                },
            };
            return self;
        }
    }

)();