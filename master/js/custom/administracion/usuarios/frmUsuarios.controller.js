(function () {
    'use strict';
    angular
        .module('app.usuarios')
        .controller('frmUsuariosController', frmUsuariosController);

    frmUsuariosController.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'Usuarios', 'Remote'];

    function frmUsuariosController($scope, $uibModalInstance, datosFrm, Usuarios, Remote) {

        var vm = this;
        $scope.frm_title = 'Nuevo Usuario';
        $scope.datos = {};
        $scope.envioDatos = {};
        $scope.listRoles = {};
        $scope.listDependencias = [];
        $scope.listCargos = [];
        vm.dtsOficinas = [];

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            console.log($scope.datos);
            if ($scope.datos.cnf && $scope.datos.cnf != null) {
                console.log('***--***');
                $scope.datos.cnf.filtro = $scope.datos.cnf.filtro.toString();
            }
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        Remote.get('md_auxiliares/Roles/combo').then(function (r) {
            $scope.listRoles = r.data;
        });
        Remote.get('comun/dependencias/combo').then(function (r) {
            $scope.listDependencias = r.data;
            vm.dtsOficinas = ($scope.datos['cnf']['oficinas'] ? $scope.datos['cnf']['oficinas'] : [])
        });
        Remote.get('comun/cargos/combo').then(function (r) {
            $scope.listCargos = (r.data ? r.data : [])
        });

        $scope.ventanillas = [];

        Usuarios.fnGetData('radicacion/ventanillas/combo').then(function (data) {
            $scope.ventanillas = data.data;
        });
        $scope.$watch("datos.ide_rol", function (newVal, oldValue) {
            if (newVal === oldValue) {
                return;
            }
            console.log(newVal);
            if (newVal != 3) {
                $scope.datos.cnf.ventanilla = null;
            }
        });
        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_usuarios.$valid) {
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
            if (datosFrm.pass !== datosFrm.pass2) {
                swal({
                    title: "Ups...!",
                    text: "Las contraseñas no coinciden",
                    type: "warning",
                    confirmButtonText: "Ok",
                    focusConfirm: true,
                    showCancelButton: false,
                });
                return false;
            }

            swal.showLoading()


            datosFrm.cnf['oficinas'] = vm.dtsOficinas;
            if (datosFrm.cnf['filtro'] && parseInt(datosFrm.cnf['filtro']) == 1) {
                datosFrm.cnf['oficinas'] = [];
            }

            if (parseInt(datosFrm.ide_rol) == 3) {
                datosFrm.cnf['oficinas'] = [];
                datosFrm.cnf['filtro'] = null;
            }

            if (accion == 'nuevo') {
                Usuarios.add($.param(datosFrm))
                    .then(function (data) {
                        $scope.envioDatos = {
                            usuario: datosFrm,
                            respuesta: data
                        }
                        $uibModalInstance.close($scope.envioDatos);
                        swal.close();
                        toast('success', 'Registro agregado')
                    })
            } else if (accion == 'edit') {
                Usuarios.update($.param(datosFrm), datosFrm.pk)
                    .then(function (data) {
                        $scope.envioDatos = {
                            usuario: datosFrm,
                            respuesta: data
                        }
                        $uibModalInstance.close($scope.envioDatos);
                        swal.close();
                        toast('success', 'Registro editado');

                    })
                    .catch(function (err) {
                        console.log(" error en editar el error es: " + err);
                    })
            }
        };
        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();
