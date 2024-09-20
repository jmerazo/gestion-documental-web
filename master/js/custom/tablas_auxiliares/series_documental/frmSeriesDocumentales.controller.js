(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmSeriesController', frmSeriesController);

    frmSeriesController.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'Series', 'Remote'];

    function frmSeriesController($scope, $uibModalInstance, datosFrm, Series, Remote) {

        $scope.frm_title = 'Nueva serie ';

        $scope.datos = {};
        $scope.envioDatos = {};
        $scope.listDependencias = [];
        $scope.listDebajode = [];

        var accion = 'nuevo';

        Remote.get('comun/dependencias/combo').then(function (r) {
            $scope.listDependencias = r.data;
        });

        Remote.get('md_auxiliares/Series_doctales/combo').then(function (r) {
            $scope.listDebajode = r.data;
        });

        if (!angular.isUndefined(datosFrm)) {
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        $scope.guardarFrm = function (datosFrm) {
            console.log("frm_ ",datosFrm);
            if (!$scope.frm_series.$valid) {
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
                Series.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        serie: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado')

                })
            } else if (accion == 'edit') {
                Series.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        serie: datosFrm,
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