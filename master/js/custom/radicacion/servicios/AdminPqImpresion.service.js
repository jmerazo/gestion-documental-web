(function () {
        'use strict';
        angular
            .module('app.radicacion')
            .factory('Adm_pq_impresos', Adm_pq_impresos);
        Adm_pq_impresos.$inject = ['API_URL_SERV', '$http', '$q'];

        function Adm_pq_impresos(API_URL_SERV, $http, $q) {
            var self = {
                loading: false,
                totRegistros: 0,
                dtsPagina: [],
                pag_actual: 1,
                total_paginas: 1,
                paginas: [],
                pag_server: 'local',
                items_por_page: 15,
                cmp_orden: 'fecha_impresion',
                orden: 'true',
                search: null,
                listCategorias: [
                    {id: 1, nom: 'Entrada'},
                    {id: 2, nom: 'Salida'},
                    {id: 3, nom: 'Internos'},
                ],
                configPagina: function ($otrosDts) {
                    var dts = {
                        nro_pagina: self.pag_actual,
                        cmp_orden: self.cmp_orden,
                        items_por_page: self.items_por_page,
                        orden: self.orden,
                    };
                    return $.extend({}, $otrosDts, dts)
                },
                cargarPagina: function (dataPost) {
                    var d = $q.defer();
                    self.loading = true;
                    $http.post(API_URL_SERV + 'radicacion/pqte_impresos/paginar', dataPost).then(function (results) {
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

                delete: function (codigo) {
                    var d = $q.defer();
                    $http.delete(API_URL_SERV + 'radicacion/pqte_impresos/elimina/' + codigo).then(function (results) {
                        d.resolve(results.data);
                    }, function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                },
                update: function (codigo,dts) {
                    var d = $q.defer();
                    $http.post(API_URL_SERV + 'radicacion/pqte_impresos/update/' + codigo,dts).then(function (results) {
                        d.resolve(results.data);
                    }, function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                },

                fnGetData: function (url) {
                    var d = $q.defer();
                    $http.get(API_URL_SERV + url).then(function (results) {
                        d.resolve(results.data);
                    });
                    return d.promise;
                },
                fnGetPdf: function (url) {
                    var d = $q.defer();
                    $http.get(API_URL_SERV + url, {responseType: 'arraybuffer'}).then(function (results) {
                        d.resolve(results.data);
                    });
                    return d.promise;
                }
            };
            return self;
        }

    }

)();