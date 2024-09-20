(function () {
    'use strict';

    angular
        .module('app.generales')
        .service('FuncionariosService', FuncionariosService);
    FuncionariosService.$inject = ['$http', '$q', 'API_URL_SERV'];

    function FuncionariosService($http, $q, API_URL_SERV) {
        var UrlApi = API_URL_SERV;

        this.getFuncionarios = getFuncionarios;

        function getFuncionarios() {
            var d = $q.defer();
            $http.get(UrlApi + 'comun/funcionarios/allActivos').then(function (results) {
                d.resolve(results.data);
            }, function () {
                d.reject('Error al consumir el serivcio')
            });
            return d.promise;
        }
    }
})();