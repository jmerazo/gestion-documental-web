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
            paginas: [],
            pag_server: 'local',
            items_por_page: 15,
            cmp_orden: 'fecha_radicado',
            orden: 'true',
            search: null,
            listCategorias: [
                { id: 1, nom: 'Entrada' },
                { id: 2, nom: 'Salida' },
                { id: 3, nom: 'Internos' },
            ],
            listTipoDocs: [],
            listEstados: [],
            listOficinas: [],
            cmpBusqueda: [
                { cmp: 'cod_radicado', title: 'Nro Radicado' },
                { cmp: 'fecha_radicado', title: 'Fec. Radicado' },
                { cmp: 'fecha_unidad_documental', title: 'Fec. Documento' },
                { cmp: 'asunto_unidad_documental', title: 'Asunto' },
                { cmp: 'datos_tercero_origen', title: 'Entidad/Tercero' },
            ],
            otrosFiltros: [
                { id: '', nom: 'No aplica' },
                { id: 'responsable', nom: 'Solo responsable' },
                { id: 'rad-devueltos', nom: 'Radicados Devueltos a ventanilla' },
                { id: 'vencidos', nom: 'Vencidos - no contestados a tiempo' },
                { id: '1-2', nom: 'Entre 1 y 2 días para dar respuesta' },
                { id: '3-5', nom: 'Entre 3 y 5 días para dar respuesta' },
                { id: '6-10', nom: 'Entre 6 y 10 días para dar respuesta' },
                { id: 'M10', nom: 'Mas de 10 dias para responder' },
            ],
            getEstados: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'md_auxiliares/estados/combo').then((dts) => {
                    self.listEstados = dts.data.data
                    d.resolve(dts.data.data)
                })
                return d.promise;
            },
            getTipoDocs: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'md_auxiliares/tipo_documentos/combo').then((dts) => {
                    self.listTipoDocs = dts.data.data
                    d.resolve()
                })
                return d.promise;
            },
            misOficinas: function () {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'comun/funcionarios/oficinasOrganigrama').then((dts) => {
                    self.listOficinas = dts.data.data
                    d.resolve()
                }, (response) => {
                    self.listOficinas = []
                    d.reject('Error en la carda de mis oficinas');
                    console.log("Error en la carda de mis oficinas", response)
                })
                return d.promise;
            },
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
                $http.post(API_URL_SERV + 'gestion_documental/gestion/paginar', dataPost).then(function (results) {
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
            fnGetPdf: function (url) {
                var d = $q.defer();
                $http.get(API_URL_SERV + url, { responseType: 'arraybuffer' }).then(function (results) {
                    d.resolve(results.data);
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
            fnGetDocumento: function (codigo) {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'gestion_documental/gestion/documento/' + codigo).then(function (results) {
                    d.resolve(results.data);
                });
                return d.promise;
            },
            fnGetHistorico: function (codigo) {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'gestion_documental/gestion/historial/' + codigo).then(function (results) {
                    d.resolve(results.data);
                });
                return d.promise;
            }

        };
        return self;
    }

}

)();
