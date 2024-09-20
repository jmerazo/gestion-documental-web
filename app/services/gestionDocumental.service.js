// app/services/gestionDocumental.service.js
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('GestionDocumental', GestionDocumental);

    GestionDocumental.$inject = ['API_URL_SERV','$http', '$q'];

    function GestionDocumental(UrlApi, $http, $q) {
        var service = {
            misOficinas: misOficinas,
            getTipoDocs: getTipoDocs,
            getEstados: getEstados,
            cargarPagina: cargarPagina,
            configPagina: configPagina
        };

        // Función para obtener oficinas
        function misOficinas() {
            var deferred = $q.defer();
            $http.get(UrlApi +'oficinas')
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        // Función para obtener tipos de documentos
        function getTipoDocs() {
            var deferred = $q.defer();
            $http.get(UrlApi +'tipodocs')
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        // Función para obtener estados de documentos
        function getEstados() {
            var deferred = $q.defer();
            $http.get(UrlApi +'estados')
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        // Función para cargar la página con documentos
        function cargarPagina(params) {
            var deferred = $q.defer();
            $http.get(UrlApi + 'gestion', { params: params })
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        // Configuración de la paginación
        function configPagina(dts) {
            return {
                page: dts.page || 1,
                size: dts.size || 10
            };
        }

        return service;
    }
})();
