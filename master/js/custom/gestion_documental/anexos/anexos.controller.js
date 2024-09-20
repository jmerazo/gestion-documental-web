(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('AnexosController', AnexosController);


    AnexosController.$inject = ['$rootScope', '$scope', '$uibModal', 'servAnexosDoc', '$stateParams', '$localStorage'];

    function AnexosController($rootScope, $scope, $uibModal, servAnexosDoc, $stateParams, $localStorage) {
        var vm = this;
        vm.dtsRad = {};
        activate();

        function activate() {
            swal.close()
            $rootScope.activetab = $stateParams.tab || ''

            $scope.Anexos = servAnexosDoc;
            vm.filtroFomr = {};
            vm.delete = deleteAnexos;


            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));

            $scope.Anexos.idrad = $stateParams.codigoRad;
            // Inicio del paginador

            $scope.pageChanged = function (dts) {
                $scope.Anexos.idrad = $stateParams.codigoRad;
                servAnexosDoc.cargarPagina($.param($scope.Anexos.configPagina(dts))).then(function (rest) {
                    $scope.Anexos = servAnexosDoc;
                });
            };

            $scope.reloadGrid = function () {
                $scope.Anexos.pag_actual = 1;
                $scope.Anexos.cmp_orden = '';
                $scope.Anexos.orden = 'true';
                $scope.Anexos.txt_buscar = '';
                $scope.Anexos.cmp_buscar = 'all';
                $scope.Anexos.idrad = $stateParams.codigoRad;
                $scope.pageChanged({});
            };

            $scope.orden = function (campo) {
                $scope.Anexos.orden = ($scope.Anexos.cmp_orden == campo) ? !$scope.Anexos.orden : false;
                $scope.Anexos.cmp_orden = campo;
                $scope.Anexos.pag_actual = 1;
                $scope.Anexos = undefined;
                $scope.Anexos = undefined;
                $scope.Anexos.idrad = $stateParams.codigoRad;
                $scope.pageChanged($scope.filtroFomr);
            };

            $scope.buscar = function () {

                $scope.Anexos.pag_actual = 1;
                $scope.Anexos.pag_actual = 1;
                $scope.pageChanged($scope.vm.filtroFomr);
            };

            $scope.reloadGrid();

            // Final del paginador

            $scope.verDocumento = function (reg) {
                console.log(reg);
                var $code = Base64.encode(reg.ide_anexo.toString());
                var token = Base64.encode($localStorage.kt.toString());
                window.open($rootScope.$URL_API + 'entornos/anexos/download/' + $code + '/' + token, '_new')
            };

            $scope.loadFile = function (dts) {
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
                    console.log(parametros)
                    $scope.reloadGrid();
                }, function (R) {
                    console.log("Formulario cerrado" + new Date())
                });
            }

            function deleteAnexos(registro) {
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
                }).then(function (result) {
                    console.log(result);
                    if (result.value) {
                        verLoading()
                        servAnexosDoc.delete(registro.ide_anexo).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.Anexos.dtsPagina.findBy('ide_anexo', registro.ide_anexo);
                                $scope.Anexos.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        }, function (r) {
                            swal.close();
                            console.log('Error al eliminar', r);
                        })
                    }
                });
            }
        }
    }
})();
