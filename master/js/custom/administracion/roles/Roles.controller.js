(function () {
    'use strict';
    angular
        .module('app.usuarios')
        .controller('RolesController', RolesController);

    RolesController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote','Rol'];

    function RolesController($rootScope, $http, $scope, $uibModal, Remote,Rol) {
        activate();

        function activate() {

            $scope.roles = Rol;

            $scope.registroRol = {};

            // Inicio del paginador
            $scope.pageChanged = function () {
                Rol.cargarPagina($.param($scope.roles.configPagina())).then(function (rest) {
                    $scope.roles = Rol;
                });
            };
            $scope.reloadGrid = function () {
                $scope.roles.pag_actual = 1;
                $scope.roles.cmp_orden = '';
                $scope.roles.orden = '';
                $scope.roles.txt_buscar = '';
                $scope.roles.cmp_buscar = 'all';
                $scope.pageChanged();
            }
            $scope.orden = function (campo) {
                $scope.roles.orden = ($scope.roles.cmp_orden == campo) ? !$scope.roles.orden : false;
                $scope.roles.cmp_orden = campo;
                $scope.roles.pag_actual = 1;
                $scope.pageChanged();
            }
            $scope.pageChanged();
            $scope.datosLista = {};

            $scope.eliminar = function (codReg, $pos) {
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
                        verLoading()
                        Rol.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.roles.dtsPagina.findBy('pk', codReg);
                                $scope.roles.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }
            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/administracion/roles/frm_roles.html' + noCacheView(),
                    controller: 'frmRolesController',
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
                    //console.log("datos desde frmRoles al crear: "+JSON.stringify(parametros));
                    $scope.roles.dtsPagina.push(parametros.rol);

                }).catch(function (err) {
                        console.log("error al crear rol: "+err);
                })
                ;
            }

            $scope.editarFrm = function (registro) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/administracion/roles/frm_roles.html' + noCacheView(),
                    controller: 'frmRolesController',
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
                    console.log("datos desde frmRoles al editar: "+JSON.stringify(infoFrm));
                    var $posicion = $scope.roles.dtsPagina.findBy('pk', infoFrm.rol.pk);
                    $scope.roles.dtsPagina[$posicion] = infoFrm.rol;
                }).catch(function (err) {
                    console.log("error al editar rol: "+err);
                })
                ;
            };

        }
    }

})();