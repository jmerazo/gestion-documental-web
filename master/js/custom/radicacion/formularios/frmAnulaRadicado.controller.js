(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmAnulaRadicadoCtrl', frmAnulaRadicadoCtrl)


    frmAnulaRadicadoCtrl.$inject = ['$rootScope', '$scope', '$uibModalInstance', 'datosFrm', 'AdminRadicacionServ'];

    function frmAnulaRadicadoCtrl($rootScope, $scope, $uibModalInstance, datosFrm, AdmService) {
        var vm = this;

        $scope.frm_title = 'Anular Radicado';

        $scope.datos = {};
        $scope.envioDatos = {};
        $scope.apiDatos = {};

        //console.log(" datos desde admin radicados: " + JSON.stringify(datosFrm));
        angular.copy(datosFrm, $scope.datos);

        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_anula_radicado.$valid) {
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

            $scope.apiDatos = {
                ide_radicado: $scope.datos.pk,
                motivo_anulado: $scope.datos.motivo_anulado,
                fecha_registro: $scope.datos.fec_doc_rad
            };

            swal.showLoading()
            AdmService.anularRadicado($.param($scope.apiDatos))
                .then(function (data) {
                    //console.log("respuesta de la api en controller frm: " + JSON.stringify(data));
                    $uibModalInstance.close(data); //envia la respuesta de la api
                    swal.close();
                    toast('success', 'Radicado anulado')
                }).catch(function (e) {
                console.log(e,"hola")
            })
        };

        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();