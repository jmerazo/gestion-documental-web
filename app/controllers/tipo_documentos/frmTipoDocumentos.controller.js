(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmTipoDocumentosController', frmTipoDocumentosController);

    frmTipoDocumentosController.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'Documento', 'Remote'];

    function frmTipoDocumentosController($scope, $uibModalInstance, datosFrm, Documento, Remote) {

        $scope.frm_title = 'Nuevo tipo de documento';

        $scope.listTipoExpediente = [];
        $scope.datos = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos);
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        Remote.get('md_auxiliares/Tipo_expedientes/combo').then(function (r) {
            $scope.listTipoExpediente = r.data;
        });

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
            swal.showLoading();
            if (accion == 'nuevo') {
                Documento.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        tipoDoc: datosFrm,
                        respuesta: data
                    };
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado');
                });
            } else if (accion == 'edit') {
                Documento.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        tipoDoc: datosFrm,
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
