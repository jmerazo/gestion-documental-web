(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('AdminPqImpresos', AdminPqImpresos)


    AdminPqImpresos.$inject = ['$scope', '$uibModal', 'Adm_pq_impresos', '$state','orderByFilter'];

    function AdminPqImpresos($scope, $uibModal, Admpqtes, $state,orderBy) {
        var vm = this;
        activate();

        function activate() {

            $scope.Adm_Pqtes = Admpqtes;

            $scope.dtsCategoria = undefined;
            $scope.dtsTipoDoc = undefined;

            vm.verRadidcadosPlanilla = verRadidcadosPlanilla;


            vm.filtroFomr = {'parambus': {valbus: $state.params.origen, nomcmp: 'origen'}};
            var dtsSearchGral = {};
            // Inicio del paginador

            $scope.pageChanged = function (dts) {
                Admpqtes.cargarPagina($.param($scope.Adm_Pqtes.configPagina(dts))).then(function (rest) {
                    console.log('Datos carg ados en grid')
                });
            };

            $scope.reloadGrid = function () {
                $scope.Adm_Pqtes.pag_actual = 1;
                $scope.Adm_Pqtes.cmp_orden = '';
                $scope.Adm_Pqtes.orden = 'true';
                $scope.Adm_Pqtes.txt_buscar = '';
                $scope.Adm_Pqtes.cmp_buscar = 'all';
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.orden = function (campo) {
                $scope.Adm_Pqtes.orden = ($scope.Adm_Pqtes.cmp_orden == campo) ? !$scope.Adm_Pqtes.orden : false;
                $scope.Adm_Pqtes.cmp_orden = campo;
                $scope.Adm_Pqtes.pag_actual = 1;
                $scope.dtsCategoria = undefined;
                $scope.dtsTipoDoc = undefined;
                $scope.pageChanged($scope.filtroFomr);
            };

            $scope.buscar = function () {
                console.log(vm.filtroFomr);
                $scope.Adm_Pqtes.pag_actual = 1;
                if (angular.isUndefined(vm.filtroFomr.parambus) || !vm.filtroFomr.parambus.valbus || !vm.filtroFomr.parambus.nomcmp) // si no existe ninguno de los dos no se envia
                    vm.filtroFomr.parambus = undefined;
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.reloadGrid();
            // Final del paginador


            $scope.printPlanilla = function (reg) {
                var url = (reg.origen.toString().trim().toLowerCase() == 'gestion') ? 'reporte.list-print-gestion' : 'reporte.list-print-gestion';
                $state.go(url, {
                    tipo_rep: 'print',
                    tipo_rad: reg.pk,
                });
            };

            $scope.updatePlanilla = function (reg) {
                swal({
                    title: 'Actualizar Planilla',
                    html: 'Se actualizará la planilla de impresion, tomando los cambios del modulo de asignación.<br>Desea continuar?!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Sí, Continuar!',
                    closeOnConfirm: false,
                    focusCancel: true,
                    allowEnterKey: true,
                    cancelButtonText: 'No, Cancelar!',
                }).then((result) => {
                    if (result.value) {
                        verLoading();
                        var dts = {
                            cdFin: reg.cd_fin,
                            cdIni: reg.cd_ini,
                            tpRad: reg.ide_tipo_radicado
                        };
                        Admpqtes.update(reg.pk, $.param(dts)).then(function (data) {
                            swal.close();
                            if (data.error === false) {
                                toast('success', data.msg);
                            }
                        })
                    }
                });
            };

            vm.eliminar = function (codigo) {
                //dtsRep

                swal({
                    title: 'Está seguro de eliminar el registro?',
                    text: 'No podras recuperar este registro!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Sí, Eliminar!',
                    closeOnConfirm: false,
                    focusCancel: true,
                    allowEnterKey: true,
                    cancelButtonText: 'No, Cancelar!',
                }).then((result) => {
                    if (result.value) {
                        verLoading();
                        Admpqtes.delete(codigo).then(function (data) {
                            swal.close();
                            if (data.error === false) {
                                var $posicion = $scope.Adm_Pqtes.dtsPagina.findBy('pk', codigo);
                                $scope.Adm_Pqtes.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg);
                            }
                        })
                    }
                });
            };
            $scope.loadFile = function (dts) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/generales/frm_upload_documento.html' + noCacheView(),
                    size: 'lg',
                    backdrop: 'static',
                    controller: 'FileUploadController',
                    controllerAs: 'form',
                    keyboard: true,
                    resolve: {
                        datosFrm: function () {
                            return dts;
                        }
                    }
                });
                modalInstance.result.then(function (parametros) {
                    $scope.terceros.dtsPagina.push(parametros);
                });
            };

            function verRadidcadosPlanilla(reg) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/reportes/pqte_impresos/modal_list_radicados_pqte.html' + noCacheView(),
                    controller: function (datosFrm, $scope, $uibModalInstance) {
                        var vm = this;
                        vm.list = datosFrm.json_planilla
                        vm.search = '';

                        $scope.selection = [];

                        // Toggle selection para adicionar los registros seleccionados
                        $scope.toggleSelection = function toggleSelection(reg) {
                            var idx = $scope.selection.findBy('pk', reg.pk);
                            if (idx > -1) {
                                $scope.selection.splice(idx, 1);
                            } else {
                                $scope.selection.push(reg);
                            }
                        };
                        $scope.cancelar = function () {
                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.print = function () {
                            $state.go('reporte.list-print-gestion', {
                                tipo_rep: 'print',
                                tipo_rad: reg.pk,
                                list_rad: orderBy($scope.selection, 'pk', false)
                            });
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    controllerAs: '$ctrlInfoPqt',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return reg;
                        }
                    }
                });

                function ctrlInfoPaquete() {
                    var vm = this;
                    vm.list = datosFrm.json_planilla
                    vm.search = '';
                    $scope.cancelar = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }

            }
        }
    }
})();