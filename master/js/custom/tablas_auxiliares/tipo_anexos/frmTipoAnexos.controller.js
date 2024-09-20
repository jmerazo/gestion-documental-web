(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmTipoAnexoCtroller', frmTipoAnexoCtroller)

    frmTipoAnexoCtroller.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'TipoAnexos'];

    function frmTipoAnexoCtroller($scope, $uibModalInstance, datosFrm, TipoAnexos) {

        $scope.frm_title = 'Nuevo tipo de anexo';
        $scope.datosAnexo = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datosAnexo)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_tipo_documento.$valid) {
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
                TipoAnexos.add('pruebas/prueba', $.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        anexo: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado')
                })
            } else if (accion == 'edit') {
                TipoAnexos.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        anexo: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro editado')
                })
            }
        };

        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();