(function () {
    'use strict';
    angular
        .module('app.usuarios')
        .controller('frmConfigUser', frmConfigUser);
    frmConfigUser.$inject = ['$scope', '$uibModalInstance', 'Usuarios', 'datosFrm'];

    function frmConfigUser($scope, $uibModalInstance, Usuarios, datosFrm) {
        var vm = this;
        activate();

        function activate() {
            vm.dtsUser = {}
            angular.copy(datosFrm, vm.dtsUser)

            vm.ventanillas = [];

            Usuarios.fnGetData('radicacion/ventanillas/combo').then(function (data) {
                console.log(data);
                vm.ventanillas = data.data;
            });

            $scope.cancelar = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    }
})();