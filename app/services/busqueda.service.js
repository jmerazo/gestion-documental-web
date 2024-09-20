(function () {
    'use strict';
    angular
        .module('app.gestion')
        .factory('busqueda', busqueda);
    busqueda.$inject = ['API_URL_SERV', '$http', '$q'];

    function busqueda(API_URL_SERV, $http, $q) {
        var self = {
            loading: false,
            totRegistros: 0,
            dtsPagina: [],
            pag_actual: 1,
            total_paginas: 1,
            paginas: [],
            pag_server: 'local',
            items_por_page: 20,
            cmp_orden: '',
            orden: '',
            search: null,

            configPagina: function () {
                return {
                    nro_pagina: self.pag_actual,
                    cmp_orden: self.cmp_orden,
                    items_por_page: self.items_por_page,
                    orden: self.orden,
                    parambus: self.search,
                };
            },

            cargarPagina: function (dataPost) {
                var d = $q.defer();
                self.loading = true;
                $http.post(API_URL_SERV + 'busqueda_avanzada/busqueda_avanzada/paginar', dataPost).then(function (results) {
                    self.totRegistros = results.data.tot_registros;
                    self.dtsPagina = results.data.rows;
                    self.pag_actual = results.data.pag_actual;
                    self.total_paginas = results.data.tot_paginas;
                    self.items_por_page = results.data.reg_x_pag
                    self.loading = false;
                    d.resolve();
                });

                return d.promise;
            },

            busqueda: function (cadena, tipoConsulta) {
                var d = $q.defer();
                $http.post(API_URL_SERV + 'busqueda_avanzada/busqueda_avanzada/busqueda/' + cadena + '/' + tipoConsulta).then(function (results) {
                    d.resolve(results.data);
                }, function (err) {
                    d.reject(err);
                });
                return d.promise;
            },

            fnGetData: function (wsEndPoint) {
                var d = $q.defer();
                $http.get(API_URL_SERV + wsEndPoint).then(function (results) {
                    d.resolve(results.data);
                });
                return d.promise;
            },
        };
        return self;
    }
})();
