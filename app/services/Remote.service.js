(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .service('Remote', Remote);

    Remote.$inject = ['$http', '$q', 'API_URL_SERV'];

    function Remote($http, $q, API_URL_SERV) {
        var UrlApi = API_URL_SERV;

        this.get = fnGetData;
        this.delete = fnDelData;
        this.cargarPagina = cargarPagina;
        this.put = fnPutData;

        this.dtsPaginado = {
            nroRegistros: 0,
            datos: [],
            pag_actual: 1,
            pag_siguiente: 1,
            pag_anterior: 1,
            total_paginas: 1,
            paginas: []
        };

        function fnGetData(url) {
            var d = $q.defer();
            $http.get(UrlApi + url).then(function (results) {
                d.resolve(results.data);
            });
            return d.promise;
        }

        function fnPutData(url, datos) {
            var d = $q.defer();
            $http.put(UrlApi + url, datos).then(function (results) {
                d.resolve(results.data);
            });
            return d.promise;
        }

        function fnDelData(url) {
            var d = $q.defer();
            $http.delete(UrlApi + url).then(function (results) {
                d.resolve(results.data);
            }, function (err) {
                d.reject(err);
            });
            return d.promise;
        }

        function cargarPagina(url, dataPost) {
            var d = $q.defer();
            $http.post(UrlApi + url, $.param(dataPost)).then(function (results) {
                d.resolve(results.data);
            });
            return d.promise;
        }
    }
})();
