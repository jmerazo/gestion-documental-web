(function () {
    'use strict';

    angular
    .module('app.routes')
    .factory('ManejoErrorsHttp', ManejoErrorsHttp);

    ManejoErrorsHttp.$inject = ["$q", "$location", "$localStorage", "jwtHelper", "$rootScope"];

    function ManejoErrorsHttp($q, $location, $localStorage, jwtHelper, $rootScope) {
        return {
            'response': function (respuesta) {
                var storagedToken = $localStorage.kt;
                var receivedToken = respuesta.headers('Jwt');
                if (receivedToken && !jwtHelper.isTokenExpired(receivedToken) && (storagedToken !== receivedToken)) {
                    $localStorage.kt = receivedToken;
                }
                return respuesta;
            },
            'responseError': function (rejection) {
                swal.close();
                var $dts = angular.fromJson(rejection.data);
                var msg = $dts.msg;
                if (rejection.status === 401) {
                    msg = 'La sesión ha caducado';
                    $location.path('/login');
                } else if (rejection.status === 403) {
                    msg = 'No tiene los privilegios suficientes';
                }

                swal({
                    type: 'error',
                    title: $dts.msg || "Error",
                    text: $dts.error_msg || "Comunicarse con el administrador",
                });
                return $q.reject(rejection);
            }
        };
    }
})();