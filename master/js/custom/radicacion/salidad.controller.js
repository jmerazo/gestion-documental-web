/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

(function () {
        'use strict';

        angular
            .module('app.radicacion')
            .controller('SalidaController', SalidaController);


        SalidaController.$inject = ['$scope', 'Remote', '$interval', '$http', 'RadSalida', '$uibModal', 'API_URL_SERV'];

        function SalidaController($scope, Remote, $interval, $http, RadSalida, $uibModal, API_URL_SERV) {
            activate();

            function activate() {

                $scope.listTipoDocs = [];
                $scope.listDependencias = [];
                $scope.listMedioRecepcion = [];
                $scope.frmRadE = {};
                $scope.fecha_automatica = 1;
                Remote.get('md_auxiliares/tipo_documentos/combo').then(function (r) {
                    $scope.listTipoDocs = r.data;
                });
                Remote.get('comun/dependencias/combo').then(function (r) {
                    $scope.listDependencias = r.data;
                });
                Remote.get('comun/funcionarios/combo').then(function (r) {
                    $scope.listFuncionarios = r.data;
                });
                Remote.get('md_auxiliares/naturaleza_documento/combo').then(function (r) {
                    $scope.listMedioRecepcion = r.data;
                });

                $scope.FilterKeys = ['nom']
                $scope.listOrigen = [];
                $scope.buscarOrigen = function (origen) {
                    return $http.post(API_URL_SERV + 'md_auxiliares/terceros/comboSearch',
                        $.param({"_search": origen})
                    ).then(function (response) {
                        $scope.listOrigen = response.data.data;
                    });
                }

                $scope.newTercero = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/views/auxiliares/terceros/frm_terceros.html' + noCacheView(),
                        controller: 'frmTercerosCtroller as md',
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            datosFrm: function () {
                                return undefined;
                            }
                        }
                    });
                    modalInstance.result.then(function (parametros) {
                        console.log(parametros)
                    });
                }
                $interval(() => {
                    if ($scope.fecha_automatica == 1) {
                        $scope.frmRadE.fecha_radicado = moment().format('YYYY-MM-DD HH:mm:ss');
                    }
                }, 1000)

                //configuracion fecha radicado
                $scope.disabled = function (date, mode) {
                    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                };
                $scope.toggleMin = function () {
                    $scope.minDate = $scope.minDate ? null : new Date();
                };

                $scope.opened = false;

                $scope.toggleMin();

                $scope.open = function ($event) {
                    console.log(4)
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.opened = true;
                }

                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1,
                    showWeeks: false,
                }

                $scope.initDate = new Date('2019-10-20');
                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
                $scope.format = 'yyyy-MM-dd'
                $scope.altInputFormats = ['d!/M!/yyyy', 'yyyy-M-!d'];

                $scope.saveRadSalida = function (datosFrm) {

                    if (!$scope.frm_rad_entrada.$valid) {
                        swal({
                            title: "Ups...!",
                            text: "Los campos en rojo son obligatorios!",
                            type: "warning",
                            confirmButtonText: "Ok",
                            focusConfirm: true,
                            showCancelButton: false,
                        });
                        return false;
                    }
                    verLoading();
                    datosFrm.fecha_documento_radicado = moment(datosFrm.fecha_documento_radicado).format('YYYY-MM-DD')
                    RadSalida.add($.param(datosFrm)).then(function (data) {
                        swal.close();
                        $scope.frmRadE = {};
                        $scope.frmRadE = {};
                        $scope.dtsTerceroSelect={};
                        $scope.dtsTipDoc={};
                        $scope.frm_rad_entrada.$setPristine();
                        verRadicado(data)
                    });
                };

                $scope.validateInput = function (name, type) {
                    var input = vm.formValidate[name];
                    return (input.$dirty || vm.submitted) && input.$error[type];
                };

                function verRadicado(dts) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/views/radicacion/frm_print_radicado.html' + noCacheView(),
                        controller: 'frmPrintRadicadoCtrl as ctPrintRad',
                        size: 'lg',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            datosFrm: function () {
                                return dts;
                            }
                        }
                    });
                    modalInstance.result.then(function (parametros) {
                        $scope.terceros.dtsPagina.push(parametros);
                    });
                }
            }
        }
    }
)();
