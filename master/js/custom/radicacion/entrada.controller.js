/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.radicacion')
        .controller('EntradaController', EntradaController)
        .controller('frmPrintRadicadoCtrl', frmPrintRadicadoCtrl);


    EntradaController.$inject = ['$scope', 'Remote', '$interval', '$http', 'RadicaEntrada', '$uibModal', 'API_URL_SERV'];

    function EntradaController($scope, Remote, $interval, $http, RadEntrada, $uibModal, API_URL_SERV) {
        activate();

        function activate() {

            $scope.listTipoDocs = [];
            $scope.listDependencias = [];
            $scope.listMedioRecepcion = [];
            $scope.dtsOficinaDest = {};
            $scope.frmRadE = {};
            $scope.fecha_automatica = 1;
            $scope.dtsTerceroSelect = {}
            $scope.dtsFunionarioDest = {}
            $scope.calendarOpenFecLim = calendarOpenFecLim;


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
                if (origen.length >= 2) {
                    return $http.post(API_URL_SERV + 'md_auxiliares/terceros/comboSearch',
                        $.param({ "_search": origen })
                    ).then(function (response) {
                        $scope.listOrigen = response.data.data;
                    });
                } else {
                    return [];
                }
            };

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
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            }

            $scope.$watch('dtsTipDoc', function (newValue, oldValue) {
                if (angular.isUndefined(newValue))
                    return;

                console.log($scope.frmRadE.fecha_documento_radicado, $scope.dtsTipDoc.nro_dias);
                var $date = moment($scope.frmRadE.fecha_radicado);
                console.log($date.businessAdd($scope.dtsTipDoc.nro_dias));

                //$scope.dateOptionsFecLim.minDate = $scope.frmRadE.fecha_documento_radicado;
                $scope.dateOptionsFecLim.minDate = $date;
                $scope.dateOptionsFecLim.initDate = $date.businessAdd($scope.dtsTipDoc.nro_dias).toDate();
                $scope.frmRadE.fecha_respuesta = $scope.dateOptionsFecLim.initDate;

            });

            function calendarOpenFecLim() {
                $scope.openedFecLim = true;
            }

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false,
            }

            $scope.dateOptionsFecLim = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false,
                minDate: new Date(),
            }

            $scope.initDate = new Date('2019-10-20');
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
            $scope.format = 'yyyy-MM-dd'
            $scope.altInputFormats = ['d!/M!/yyyy', 'yyyy-M-!d'];

            $scope.save = function (datosFrm) {

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
                datosFrm.fecha_respuesta = moment(datosFrm.fecha_respuesta).format('YYYY-MM-DD');
                RadEntrada.add($.param(datosFrm)).then(function (data) {
                    swal.close();
                    $scope.frmRadE = {};
                    $scope.dtsTerceroSelect.selected = undefined;
                    $scope.dtsTerceroSelect = {};
                    $scope.dtsTipDoc = {};
                    $scope.dtsOficinaDest.selected = undefined;
                    $scope.dtsOficinaDest = {};
                    //$scope.dtsFunionarioDest.selected = undefined;
                    $scope.dtsFunionarioDest = {};
                    $scope.dtsTipDoc = {};
                    $scope.frm_rad_entrada.$setPristine();
                    $scope.listOrigen = [];

                    verRadicado(data);
                }, function (err) {
                    console.log(err);
                    swal({
                        title: "Ups...!",
                        text: "Algo salio mal, si el error continua comuniquese con el administrador",
                        type: "warning",
                        confirmButtonText: "Ok",
                        focusConfirm: true,
                        showCancelButton: false,
                    });
                })
            }

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

    frmPrintRadicadoCtrl.$inject = ['$scope', '$uibModalInstance', 'datosFrm'];

    function frmPrintRadicadoCtrl($scope, $uiModal, datosFrm) {
        $scope.radicado = datosFrm;

        $scope.posicion = "1";
        setTimeout(function () {
            $('#qrRadicado').qrcode({
                text: datosFrm.nro_radicado + '\nFR ' + datosFrm.fec_rad + '\nFD ' + datosFrm.fec_doc,
                render: 'image',
                minVersion: 1,
                ecLevel: 'M',
                size: 60,
                fill: '#000',
            });
        }, 10);

        $scope.$watch('posicion', function (newV, oldV) {
            var v = parseInt(newV);
            if (v % 2 == 0) {
                $("#tbRadicado").prop("align", "right")
            } else {
                $("#tbRadicado").prop("align", "left")
            }
        });

        $scope.cancelar = function () {
            $uiModal.dismiss('cancel');
        };
        $scope.print = function () {
            var pos = 1
            $('#areaPrint').printArea({ position: $scope.posicion });
            $uiModal.dismiss('cancel');
        }
    }
})
    ();
