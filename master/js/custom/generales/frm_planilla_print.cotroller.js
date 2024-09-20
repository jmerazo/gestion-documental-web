(function () {
    'use strict';
    angular
        .module('app.generales')
        .controller('frmPlnaillaPrint', frmPlnaillaPrint) /// esta mal escrito planilla


    frmPlnaillaPrint.$inject = ['$scope', '$uibModalInstance', '$state', 'datosFrm'];

    function frmPlnaillaPrint($scope, $modal, $state, datosFrm) {
        var vm = this;
        activate();

        function activate() {
            console.log(datosFrm);
            vm.listCategorias = [
                {id: 1, nom: 'Entrada'},
                {id: 2, nom: 'Salida'},
                {id: 3, nom: 'Internos'},
            ];
            vm.dtscategoria = null;


            $scope.cancelar = function () {
                $modal.dismiss('cancel');
            };

            $scope.print = function () {
                if (!vm.ver_reporte || !vm.dtscategoria.id) {
                    swal("Campos en rojo obligatorios")
                    return
                }
                $state.go(datosFrm.url, {tipo_rep: vm.ver_reporte, tipo_rad: vm.dtscategoria.id});
                $scope.cancelar();
            }
        }
    }
})();