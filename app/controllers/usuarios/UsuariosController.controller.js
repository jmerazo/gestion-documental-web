(function () {
    'use strict';

    angular
        .module('app.usuarios')
        .controller('UsuariosController', UsuariosController);

    UsuariosController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'Usuarios'];

    function UsuariosController($rootScope, $http, $scope, $uibModal, Remote, Usuarios) {
        activate();

        function activate() {
            $scope.user = Usuarios;
            $scope.filtroFomr = {'parambus': {'nomcmp': 'all', 'valbus': ''}};
            $scope.registroUsuario = {};

            $scope.pageChanged = function (dts) {
                if (!dts) {
                    dts = $scope.filtroFomr;
                }
                Usuarios.cargarPagina($.param($scope.user.configPagina(dts))).then(function () {
                    $scope.user = Usuarios;
                });
            };

            $scope.reloadGrid = function () {
                $scope.user.pag_actual = 1;
                $scope.user.cmp_orden = '';
                $scope.user.orden = '';
                $scope.user.txt_buscar = '';
                $scope.user.cmp_buscar = 'all';
                $scope.pageChanged();
            };

            $scope.orden = function (campo) {
                $scope.user.orden = ($scope.user.cmp_orden == campo) ? !$scope.user.orden : false;
                $scope.user.cmp_orden = campo;
                $scope.user.pag_actual = 1;
                $scope.pageChanged();
            };

            $scope.pageChanged();

            $scope.buscar = function () {
                $scope.user.pag_actual = 1;
                $scope.pageChanged($scope.filtroFomr);
            };

            $scope.eliminar = function (codReg) {
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
                        Usuarios.delete(codReg).then(function (data) {
                            swal.close();
                            if (!data.error) {
                                var $posicion = $scope.user.dtsPagina.findBy('pk', codReg);
                                $scope.user.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg);
                            }
                        });
                    }
                });
            };

            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/administracion/usuarios/frm_usuarios.html' + noCacheView(),
                    controller: 'frmUsuariosController',
                    controllerAs: 'frmUser',
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
                    $scope.user.dtsPagina.push(parametros.usuario);
                });
            };

            $scope.editarFrm = function (registro) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/administracion/usuarios/frm_usuarios.html' + noCacheView(),
                    controller: 'frmUsuariosController',
                    controllerAs: 'frmUser',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return registro;
                        }
                    }
                });

                modalInstance.result.then(function (infoFrm) {
                    var $posicion = $scope.user.dtsPagina.findBy('pk', infoFrm.usuario.pk);
                    $scope.user.dtsPagina[$posicion] = infoFrm.usuario;
                });
            };

            $scope.fnChangePass = function (registro) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/administracion/usuarios/frm_cambiar_pass.html' + noCacheView(),
                    controller: 'frmPassChange',
                    controllerAs: 'ctPass',
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return registro;
                        }
                    }
                });
            };
        }
    }
})();
