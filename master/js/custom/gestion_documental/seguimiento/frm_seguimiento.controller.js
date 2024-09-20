(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('SeguimientoController', SeguimientoController);

    SeguimientoController.$inject = ['Upload', '$rootScope', '$scope', '$uibModal', '$stateParams',
        'servSeguimientoDoc', '$localStorage'];

    function SeguimientoController(Upload, $rootScope, $scope, $uibModal, $stateParams,
                                   servSeguimiento, $localStorage) {
        var vm = this;
        $scope.datos = {};
        vm.dtsRad = null;
        vm.infoAnexo = null;
        activate();

        function activate() {

            var dtsSave = null;
            $scope.datos['ide_estado'] = '2';
            $scope.panelPortlet2 = true;
            vm.addAnexo = addAnexo;
            vm.fnSaveGestion = saveGestion;
            vm.pageChanged = paginar;
            vm.reloadGrid = refreshGrid;
            vm.verDocumento = downloadAnexo;
            vm.servicio = servSeguimiento;

            vm.reloadGrid();
            swal.close()
            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));
            $rootScope.activetab = $stateParams.tab || '';

            function paginar(dts) {
                vm.servicio.idrad = $stateParams.codigoRad;
                servSeguimiento.cargarPagina($.param(vm.servicio.configPagina(dts))).then(function (rest) {
                    vm.servicio = servSeguimiento;
                });
            };

            function refreshGrid() {
                vm.servicio.pag_actual = 1;
                vm.servicio.cmp_orden = 'feccha_gestion';
                vm.servicio.orden = 'true';
                vm.servicio.txt_buscar = '';
                vm.servicio.cmp_buscar = 'all';
                vm.servicio.idrad = $stateParams.codigoRad;
                paginar({});
            };

            function downloadAnexo(reg) {
                var $code = Base64.encode(reg.ide_anexo.toString());
                var token = Base64.encode($localStorage.kt.toString());
                window.open($rootScope.$URL_API + 'entornos/anexos/download/' + $code + '/' + token, '_new')
            };

            function addAnexo(dts) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/gestion_documental/anexos_doc/frm_anexos.html' + noCacheView(),
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: true,
                    controller: 'frmAnexosController',
                    controllerAs: 'frmAnexos',
                    resolve: {
                        datosFrm: function () {
                            return dts;
                        }
                    }
                });
                modalInstance.result.then(function (parametros) {
                    dtsSave = parametros;
                    vm.infoAnexo = parametros;
                }, function (R) {
                    console.log("Formulario cerrado" + new Date())
                });
            }

            function saveGestion($dataSeguimiento) {
                if (!$scope.frmSeguimiento.$valid) {
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
                if (dtsSave === null) {
                    dtsSave = $dataSeguimiento;
                    dtsSave['pk'] = vm.dtsRad.pk;
                    servSeguimiento.fnSaveSeguimiento($.param(dtsSave)).then(rtaSaveGestion)
                } else {
                    dtsSave['frmSeguimiento'] = angular.toJson($dataSeguimiento);
                    fnSaveAnexoGestion();
                }
            }

            function rtaSaveGestion(resp) {
                console.log(resp)
                swal.close()
                if (!resp.error) {
                    swal({
                        type: 'success',
                        title: '',
                        text: 'Información de gestión guardada',
                    });

                    dtsSave = null;
                    vm.infoAnexo = null;
                    $scope.datos = {};
                    $scope.datos['ide_estado'] = '2';
                    $scope.frmSeguimiento.$setPristine();
                    vm.reloadGrid();
                } else {
                    swal({
                        type: 'error',
                        title: 'Ups!',
                        text: resp.msg,
                    });
                    dtsSave = null;
                }
            }

            function fnSaveAnexoGestion() {
                Upload.upload({
                    url: $rootScope.$URL_API + 'entornos/anexos/save',
                    data: dtsSave,
                }).then(rtaSaveGestion, function (response) {
                    var msg = response.data.msg;
                    if (status == 401) {
                        msg = 'La sesión ha caducado'
                        $location.path('/login');
                    }
                    if (status == 403) {
                        msg = 'No tiene los privilegios sufucientes para ejecutar esta acción'
                    }
                    swal({
                        type: 'error',
                        title: 'Ups!',
                        text: msg,
                    });
                }, function (evt) {
                });
            }
        }
    }
})();
