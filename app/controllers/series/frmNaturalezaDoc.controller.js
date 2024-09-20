(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmNaturalezaDocController', frmNaturalezaDocController);

    frmNaturalezaDocController.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'NaturalDoc'];

    function frmNaturalezaDocController($scope, $uibModalInstance, datosFrm, NaturalDoc) {

        $scope.frm_title = 'Nueva Naturaleza documental ';

        $scope.datos = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';
        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_natural_doc.$valid) {
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
                NaturalDoc.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        natuDoc: datosFrm,
                        respuesta: data
                    };
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado');
                });
            } else if (accion == 'edit') {
                NaturalDoc.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        natuDoc: datosFrm,
                        respuesta: data
                    };
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro editado');
                });
            }
        };

        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
