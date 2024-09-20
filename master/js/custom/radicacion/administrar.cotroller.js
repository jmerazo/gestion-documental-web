(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('AdminRadicados', AdminRadicados)


    AdminRadicados.$inject = ['$rootScope', '$scope', '$uibModal', 'AdminRadicacionServ', '$stateParams'];

    function AdminRadicados($rootScope, $scope, $uibModal, AdmService, $stateParams) {
        var vm = this;
        activate();

        function activate() {

            $scope.AdminRadicados = AdmService;
            AdmService.getTipoDocs();
            $scope.dtsCategoria = undefined;
            $scope.dtsTipoDoc = undefined;
            $scope.verAnular = false;

            vm.filtroFomr = {};
            var dtsSearchGral = {};
            // Inicio del paginador
            vm.removeParambus = (c) => {
                if (angular.isUndefined(c)) {
                    if (vm.filtroFomr.parambus.valbus) {
                        vm.filtroFomr.parambus = undefined
                        $scope.buscar();
                    }
                }
            }

            //console.log("lo que llega de usuario: "+JSON.stringify( $rootScope.user.config ) );

            if( $rootScope.user.ide_rol == 3 ){ // si es ventanilla 1 puede ver la opcion anular
                $scope.verAnular = true;
            }

            $scope.pageChanged = function (dts) {
                AdmService.cargarPagina($.param($scope.AdminRadicados.configPagina(dts))).then(function (rest) {
                    $scope.AdminRadicados = TipoAnexos;
                });
            };

            $scope.reloadGrid = function () {
                $scope.AdminRadicados.pag_actual = 1;
                $scope.AdminRadicados.cmp_orden = '';
                $scope.AdminRadicados.orden = 'true';
                $scope.AdminRadicados.txt_buscar = '';
                $scope.AdminRadicados.cmp_buscar = 'all';
                $scope.pageChanged({});
            }

            $scope.orden = function (campo) {
                $scope.AdminRadicados.orden = ($scope.AdminRadicados.cmp_orden == campo) ? !$scope.AdminRadicados.orden : false;
                $scope.AdminRadicados.cmp_orden = campo;
                $scope.AdminRadicados.pag_actual = 1;
                $scope.dtsCategoria = undefined;
                $scope.dtsTipoDoc = undefined;
                $scope.pageChanged($scope.filtroFomr);
            }
            $scope.buscar = function () {
                console.log(vm.filtroFomr)
                $scope.AdminRadicados.pag_actual = 1;
                if (angular.isUndefined(vm.filtroFomr.parambus) || !vm.filtroFomr.parambus.valbus || !vm.filtroFomr.parambus.nomcmp) // si no existe ninguno de los dos no se envia
                    vm.filtroFomr.parambus = undefined;
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.pageChanged();
            // Final del paginador

            $scope.verRadicado = function (dts) {
                console.log(dts);
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

            $scope.anulaRadicado = function (dts) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/radicacion/frm_anula_radicado.html' + noCacheView(),
                    controller: 'frmAnulaRadicadoCtrl',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return dts;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    //console.log(" sale del modal anular radicado ");
                });
            };

            $scope.generaPlanilla = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/radicacion/frm_genera_planilla.html' + noCacheView(),
                    controller: 'frmPlnaillaPrint as ctPl',
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return {'url':'reporte.list-radicados'};
                        }
                    }
                });
                modalInstance.result.then(function (parametros) {

                });
            }

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
            }

        }
    }
})();