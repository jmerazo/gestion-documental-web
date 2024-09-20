(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmCarpetasController', frmCarpetasController);

    frmCarpetasController.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'SeriesCarp', 'Remote'];

    function frmCarpetasController($scope, $uibModalInstance, datosFrm, SeriesCarp, Remote) {

        $scope.frm_title = 'Nueva carpeta de documentos ';

        $scope.datos = {};
        $scope.envioDatos = {};
        //$scope.listDependencias = [];
        //$scope.listDebajode = [];

        var accion = 'nuevo';

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del Expediente';
            accion = 'edit';
        }

        $scope.guardarFrm = function (datosFrm) {
            if (!$scope.frm_seriesCarp.$valid) {
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
                console.log("frm_seriesCarp datos: "+JSON.stringify(datosFrm));
                SeriesCarp.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        expediente: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado')

                })
            } else if (accion == 'edit') {
                SeriesCarp.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    //console.log("datos al editar: "+JSON.stringify(datosFrm) );
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