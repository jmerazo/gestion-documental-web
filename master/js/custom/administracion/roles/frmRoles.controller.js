(function () {
    'use strict';
    angular
        .module('app.usuarios')
        .controller('frmRolesController', frmRolesController);

    frmRolesController.$inject = ['$scope', '$uibModalInstance', 'datosFrm','Rol'];

    function frmRolesController($scope, $uibModalInstance, datosFrm, Rol) {

        $scope.frm_title = 'Nuevo Rol ';
        $scope.datos = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }
        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_roles.$valid) {
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
            swal.showLoading()

            if (accion == 'nuevo') {
                Rol.add( $.param(datosFrm))
                    .then(function (data) {
                        $scope.envioDatos = {
                            rol: datosFrm,
                            respuesta: data
                        }
                        $uibModalInstance.close($scope.envioDatos);
                        swal.close();
                        toast('success', 'Registro agregado')

                    })
            } else if (accion == 'edit') {
                Rol.update($.param(datosFrm), datosFrm.pk)
                    .then(function (data) {
                        $scope.envioDatos = {
                            rol: datosFrm,
                            respuesta: data
                        }
                        $uibModalInstance.close($scope.envioDatos);
                        swal.close();
                        toast('success', 'Registro editado');
                    })
                    .catch(function (err) {
                        console.log("error al editar roles : "+err);
                    })
            }
        };

        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }


})();