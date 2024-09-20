(function () {
    'use strict';
    angular
        .module('app.usuarios')
        .controller('frmPassChange', frmPassChange);
    frmPassChange.$inject = ['$scope', 'datosFrm', '$uibModalInstance', 'Usuarios'];

    function frmPassChange($scope, datosFrm, $uibModalInstance, Usuarios) {
        var vm = this;
        activate();

        function activate() {
            vm.dtsUser = {}
            angular.copy(datosFrm, vm.dtsUser)
            $scope.changePass = function (datosFrm) {
                if (!$scope.frmChangePass.$valid) {
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

                Usuarios.changePass($.param(datosFrm), vm.dtsUser.pk).then(function (data) {
                    $uibModalInstance.close(data);
                    swal.close();
                    toast('success', data.msg)
                })
            }

            $scope.cancelar = function () {
                $uibModalInstance.dismiss('cancel');
            };


        }
    }
})();
