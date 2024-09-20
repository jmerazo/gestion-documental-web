(function () {
        'use strict';
        angular
            .module('app.gestion')
            .factory('servSeguimientoDoc', servSeguimientoDoc);
        servSeguimientoDoc.$inject = ['API_URL_SERV', '$http', '$q'];

        function servSeguimientoDoc(API_URL_SERV, $http, $q) {

            var self = {
                loading: false,
                totRegistros: 0,
                dtsPagina: [],
                pag_actual: 1,
                total_paginas: 1,
                paginas: [],
                pag_server: 'local',
                items_por_page: 15,
                cmp_orden: 'fecha_documento',
                orden: 'true',
                search: null,
                idrad: null,
                listTipoDocs: [],
                cmpBusqueda: [
                    {cmp: 'cod_radicado', title: 'Nro Radicado'},
                    {cmp: 'fecha_radicado', title: 'Fec. Radicado'},
                    {cmp: 'asunto_unidad_documental', title: 'Asunto'},
                ],

                configPagina: function ($otrosDts) {

                    var dts = {
                        nro_pagina: self.pag_actual,
                        cmp_orden: self.cmp_orden,
                        items_por_page: self.items_por_page,
                        orden: self.orden,
                        idrad: self.idrad,
                    };
                    return $.extend({}, $otrosDts, dts)
                },

                cargarPagina: function (dataPost) {

                    console.log("Servicio anexos")
                    if (!self.idrad) {
                        alert("Falta datos para cargar los anexos")
                        return false;
                    }
                    var d = $q.defer();
                    self.loading = true;
                    $http.post(API_URL_SERV + 'gestion_documental/seguimiento/paginar/' + self.idrad, dataPost).then(function (results) {
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
                fnGetData: function (url) {
                    var d = $q.defer();
                    $http.get(API_URL_SERV + url).then(function (results) {
                        d.resolve(results.data);
                    });
                    return d.promise;
                },
                fnSaveSeguimiento: function (data) {
                    var d = $q.defer();
                    $http.put(API_URL_SERV + 'gestion_documental/seguimiento/save', data).then(function (results) {
                        d.resolve(results.data);
                    }, function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                },
                delete: function (codigo) {
                    var d = $q.defer();
                    $http.delete(API_URL_SERV + 'entornos/anexos/elimina/' + codigo).then(function (results) {
                        d.resolve(results.data);
                    }, function (err) {
                        d.reject(err);
                        console.log('Fallo')
                    });
                    return d.promise;
                },
            };
            return self;
        }

    }

)();