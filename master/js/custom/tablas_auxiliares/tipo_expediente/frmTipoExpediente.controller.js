(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmTipoExpedientesController', frmTipoExpedientesController);

    frmTipoExpedientesController.$inject = ['$scope', '$uibModalInstance', 'datosFrm','Expediente'];

    function frmTipoExpedientesController($scope, $uibModalInstance, datosFrm,Expediente) {

        $scope.frm_title = 'Nuevo tipo expediente';

        $scope.datos = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_tipo_expediente.$valid) {
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
                Expediente.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        expediente: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado')
                })
            } else if (accion == 'edit') {
                Expediente.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        expediente: datosFrm,
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