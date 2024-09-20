/**=========================================================
 * Module: dashboard.js
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.dashboard')
        .controller('dash1Controller', dash1Controller);


    dash1Controller.$inject = ['$scope', 'Dashboards', 'Colors', '$rootScope', '$localStorage','$state'];

    function dash1Controller($scope, Dashboards, Colors, $rootScope, store,$state) {
        var vm = this;


        activate();

        function activate() {

            console.log($rootScope);

            vm.datosGraficoRadicadosXMes = {};
            vm.datosRadicadosxTipoDocumento = {};
            vm.datosRadicadosxUnidadAdtiva = {};
            vm.datosTotalesxTiempoRads = [];
            vm.datosMediosRecepcion = {};
            vm.datosApi = {};
            vm.anio = 2020;
            //FILTROS A GESTION DOCUMENTAL
            vm.filtroGestion = function (filtro) {
                if (!store.searchGestion) {
                    store.searchGestion = {'otrofil': filtro};
                } else {
                    store.searchGestion.otrofil = filtro;
                }
                $state.go('app.sgd-gestion');

            }

            //DATOS INICIALES TOTALES DOCUMENTOS

            Dashboards.fnGetData('dashboards/principal/regsPorTipo').then(function (rta) {
                vm.datosTotalesxTiempoRads = rta.data;
                //console.log("datos del mes");
                console.log(vm.datosTotalesxTiempoRads);
            });

            //DATOS DE RADICADOS POR DIAS SEMANAS Y MES
            Dashboards.fnGetData('dashboards/principal/regsBassPrin').then(function (rta) {
                vm.cuadro1 = rta.data;
                console.log("datos del mes");
                console.log(vm.cuadro1);
            });
            /* ----------------------------------------------
                    GRAFICA DE NUMERO DE RADICADOS POR MES
            ---------------------------------------------- */
            Dashboards.fnGetData('dashboards/principal/radicadosxMes/' + vm.anio).then(function (rta) {
                vm.datosGraficoRadicadosXMes = rta.data;
                //console.log("datos del mes");
                //console.log(vm.datosGraficoRadicadosXMes);
            });

            /*En esta propiedad se puede configurar el grafico en general*/
            vm.chartOptionsXMes = {
                title: {
                    display: true,
                    text: 'Número de radicados por mes en el año ' + vm.anio
                },
                plugins: {
                    labels: {
                        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                        render: 'value',
                    }
                }

            };

            /*En esta propiedad se puede configurar la informacion de los datos de cada barra*/
            vm.datasetOverride = [
                {
                    label: 'Dataset 1',
                    backgroundColor: Colors.randomColor(),
                    borderColor: Colors.byPoss(0),
                    borderWidth: 1
                }, {
                    label: 'Dataset 2',
                    backgroundColor: Colors.byPoss(1),
                    borderColor: Colors.byPoss(1),
                    borderWidth: 1
                }
            ];

            /* ----------------------------------------------------------------
                    GRAFICA DE NUMERO DE POR TIPO DE DOCUMENTO
            ----------------------------------------------------------------- */

            Dashboards.fnGetData('dashboards/principal/radicadosxTipoDocumento/' + vm.anio)
                .then(function (rta) {
                    vm.datosRadicadosxTipoDocumento = rta.data;
                    //console.log("datos tipo documento por año");
                    //console.log(vm.datosRadicadosxTipoDocumento);
                });

            vm.chartOptionsXDoc = {
                title: {
                    display: true,
                    text: 'Número de radicados por tipo de documento del año ' + vm.anio
                },
                plugins: {
                    labels: {
                        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                        render: 'value',
                    }
                }

            };

            vm.datasetOverride2 = [
                {
                    label: 'Dataset 1',
                    backgroundColor: Colors.randomColor(),
                    borderColor: Colors.byPoss(0),
                    borderWidth: 1
                }, {
                    label: 'Dataset 2',
                    backgroundColor: Colors.byPoss(1),
                    borderColor: Colors.byPoss(1),
                    borderWidth: 1
                }
            ];

            /* ----------------------------------------------------------------
                    GRAFICA  MEDIOS DE RECEPCION
            ----------------------------------------------------------------- */

            Dashboards.fnGetData('dashboards/principal/radicadosxMedioRecepcion/' + vm.anio)
                .then(function (rta) {
                    vm.datosMediosRecepcion = rta.data;
                    //console.log("datos de medios de recepcion");
                    //console.log(vm.datosMediosRecepcion);
                });

            vm.chartOptionsXTipoDoc = {
                title: {
                    display: true,
                    text: 'Número de radicados por medios de recepción del año ' + vm.anio
                },
                plugins: {
                    labels: {
                        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                        render: 'value',
                    }
                }

            };

            vm.datasetOverride3 = [
                {
                    label: 'Dataset 1',
                    backgroundColor: Colors.randomColor(),
                    borderColor: Colors.byPoss(0),
                    borderWidth: 1
                }, {
                    label: 'Dataset 2',
                    backgroundColor: Colors.byPoss(1),
                    borderColor: Colors.byPoss(1),
                    borderWidth: 1
                }
            ];

            /* ----------------------------------------------------------------
                GRAFICA  UNIDAD ADMINISTRATIVA
            ----------------------------------------------------------------- */

            Dashboards.fnGetData('dashboards/principal/radicadosxUnidadAdtiva/' + vm.anio)
                .then(function (rta) {
                    vm.datosRadicadosxUnidadAdtiva = rta.data;
                    console.log("datos de unidad administrativa");
                    console.log(vm.datosRadicadosxUnidadAdtiva);
                });

            vm.chartOptionsXUniAdtiva = {
                title: {
                    display: true,
                    text: 'Número de radicados para unidades administrativas del año ' + vm.anio
                },
                plugins: {
                    labels: {
                        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                        render: 'value',
                    }
                }

            };

            vm.datasetOverride4 = [
                {
                    label: 'Dataset 1',
                    backgroundColor: Colors.randomColor(),
                    borderColor: Colors.byPoss(0),
                    borderWidth: 1
                }, {
                    label: 'Dataset 2',
                    backgroundColor: Colors.byPoss(1),
                    borderColor: Colors.byPoss(1),
                    borderWidth: 1
                }
            ];

            /*----------------------------------------------------*/


        }
    }
})();
