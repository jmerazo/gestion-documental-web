(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('GestionController', GestionController)


    GestionController.$inject = ['$rootScope', '$scope', '$uibModal', 'GestionDocumental', '$localStorage'];

    function GestionController($rootScope, $scope, $uibModal, GestionDocumental, store) {
        var vm = this;
        activate();

        function activate() {

            vm.permAsigna = permAsigna;
            vm.cnfUser = $rootScope.user;

            $scope.GestioDoc = GestionDocumental;

            GestionDocumental.misOficinas()
            GestionDocumental.getTipoDocs()

            $scope.dtsCategoria = undefined;
            $scope.dtsTipoDoc = undefined;
            vm.verRadicado = modalRadicado;
            vm.listEstados = []

            vm.filtroFomr = store.searchGestion || {};
            console.log(vm.cnfUser)
            if (vm.filtroFomr.pk && vm.filtroFomr.pk != vm.cnfUser.idu) {
                vm.filtroFomr = {};
                console.log("paso x ", vm.filtroFomr)

            } else {
                vm.filtroFomr.pk = vm.cnfUser.idu;
                console.log("paso xx ", vm.filtroFomr)
            }

            $scope.typoBarra = function (value) {
                var type;
                if (value < 25) {
                    type = 'success';
                } else if (value < 50) {
                    type = 'info';
                } else if (value < 75) {
                    type = 'warning';
                } else {
                    type = 'danger';
                }
                return type
            }

            GestionDocumental.getEstados().then(function (data) {
                console.log(data);
                vm.listEstados = data;
            });

            // Inicio del paginador

            $scope.docLeido = function (reg) {
                if (reg.func_responsables.indexOf(parseInt($rootScope.user.codFun)) > -1) {
                    return (reg.leido == null) ? true : false;
                } else {
                    return false
                }
            }

            $scope.colorReg = function (reg) {
                if (reg.func_responsables.indexOf(parseInt($rootScope.user.codFun)) > -1) {
                    return '#f7fff6'
                } else {
                    return '#fffbfc'
                }
            }

            $scope.pageChanged = function (dts) {
                if (!dts) {
                    dts = vm.filtroFomr;
                }
                GestionDocumental.cargarPagina($.param($scope.GestioDoc.configPagina(dts))).then(function (rest) {
                    $scope.GestioDoc = GestionDocumental;
                });
            };

            $scope.reloadGrid = function () {
                $scope.GestioDoc.pag_actual = 1;
                $scope.GestioDoc.cmp_orden = '';
                $scope.GestioDoc.orden = 'true';
                $scope.GestioDoc.txt_buscar = '';
                $scope.GestioDoc.cmp_buscar = 'all';
                $scope.pageChanged({});
                vm.filtroFomr = {};
            }

            $scope.orden = function (campo) {
                $scope.GestioDoc.orden = ($scope.GestioDoc.cmp_orden == campo) ? !$scope.GestioDoc.orden : false;
                $scope.GestioDoc.cmp_orden = campo;
                $scope.GestioDoc.pag_actual = 1;
                $scope.dtsCategoria = undefined;
                $scope.dtsTipoDoc = undefined;
                $scope.pageChanged(vm.filtroFomr);
            };

            vm.removeFiltro = function (r, t) {
                if (t === undefined) {
                    delete vm.filtroFomr.parambus
                    $scope.buscar();
                }
            }

            $scope.buscar = function () {
                $scope.GestioDoc.pag_actual = 1;
                $scope.GestioDoc.pag_actual = 1;
                store.searchGestion = vm.filtroFomr;
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.pageChanged();

            // Final del paginador
            $scope.planillaGestion = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/generales/frm_genera_planilla.html' + noCacheView(),
                    controller: 'frmPlnaillaPrint as ctPl',
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return { 'url': 'reporte.list-print-gestion' };
                        }
                    }
                });
                modalInstance.result.then(function (parametros) {

                });
            }

            function permAsigna() {
                return (vm.cnfUser.config.ventanilla && vm.cnfUser.config.ventanilla.toString().trim().length > 0)
            }

            function modalRadicado(dts) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/radicacion/frm_print_radicado.html' + noCacheView(),
                    controller: 'frmPrintRadicadoCtrl as ctrlprint',
                    size: 'md',
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
            };
        }
    }
})();
