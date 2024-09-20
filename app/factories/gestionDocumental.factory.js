(function () {
    'use strict';

    angular
        .module('app.gestion')
        .factory('GestionDocumental', GestionDocumental);

    GestionDocumental.$inject = ['API_URL_SERV', '$http', '$q'];

    function GestionDocumental(API_URL_SERV, $http, $q) {
        var self = {
            loading: false,
            totRegistros: 0,
            dtsPagina: [],
            pag_actual: 1,
            total_paginas: 1,
            items_por_page: 15,
            listEstados: [],
            listOficinas: [],
            getEstados: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'md_auxiliares/estados/combo').then(function (dts) {
                    self.listEstados = dts.data.data;
                    d.resolve(dts.data.data);
                });
                return d.promise;
            },
            getTipoDocs: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'md_auxiliares/tipo_documentos/combo').then(function (dts) {
                    self.listTipoDocs = dts.data.data;
                    d.resolve();
                });
                return d.promise;
            },
            misOficinas: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'comun/funcionarios/oficinasOrganigrama').then(function (dts) {
                    self.listOficinas = dts.data.data;
                    d.resolve();
                }).catch(function () {
                    self.listOficinas = [];
                    d.reject('Error en la carga de oficinas');
                });
                return d.promise;
            },
            cargarPagina: function (dataPost) {
                var d = $q.defer();
                self.loading = true;
                $http.post(API_URL_SERV + 'gestion_documental/gestion/paginar', dataPost).then(function (results) {
                    self.totRegistros = results.data.tot_registros;
                    self.dtsPagina = results.data.rows;
                    self.pag_actual = results.data.pag_actual;
                    self.total_paginas = results.data.tot_paginas;
                    self.items_por_page = results.data.reg_x_pag;
                    self.loading = false;
                    d.resolve();
                });
                return d.promise;
            }
        };
        return self;
    }
})();
