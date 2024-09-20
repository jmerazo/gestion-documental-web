(function () {
    'use strict';
    angular
        .module('app.radicacion')
        .controller('repRadListadoPrint', repRadListadoPrint);

    repRadListadoPrint.$inject = ['$rootScope', '$scope', '$uibModal', 'AdminRadicacionServ', '$stateParams', '$http'];

    function repRadListadoPrint($rootScope, $scope, $uibModal, AdmService, $stateParams, $http) {
        var vm = this;
        vm.tipo_reporte = null;
        vm.listDocRads = [];
        activate();

        function activate() {
            $scope.titleReporte = '<i>Planilla de Radicados</i>';
            vm.tipo_reporte = $stateParams.tipo_rep;

            var codigo = $stateParams.tipo_rad;

            verLoading();

            if ($stateParams.tipo_rep === 'print') {
                AdmService.fnGetData('radicacion/pqte_impresos/printPlanilla/' + vm.tipo_reporte + '/' + codigo)
                    .then(function (dts) {
                        vm.listDocRads = dts.data;
                        swal.close();
                    });
            }

            if ($stateParams.tipo_rep === 'list' || $stateParams.tipo_rep === 'ver') {
                AdmService.fnGetData('radicacion/radicar/printPlanillaDia/' + vm.tipo_reporte + '/' + codigo)
                    .then(function (dts) {
                        vm.listDocRads = dts.data;
                        swal.close();
                    });
            } else if ($stateParams.tipo_rep === 'pdf') {
                AdmService.fnGetPdf('radicacion/radicar/printPlanillaDia/pdf/' + $stateParams.tipo_rad)
                    .then(function (data) {
                        var file = new Blob([data], { type: 'application/pdf' });
                        var fileURL = URL.createObjectURL(file);
                        document.getElementById('visualizador').setAttribute('src', fileURL);
                        swal.close();
                    });
            } else {
                swal.close();
            }
        }
    }
})();
