(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('repGestionListPrint', repGestionListPrint)


    repGestionListPrint.$inject = ['$rootScope', '$scope', '$uibModal', 'GestionDocumental',
        '$stateParams', '$http'];

    function repGestionListPrint($rootScope, $scope, $uibModal, AdmService, $stateParams) {
        var vm = this;
        vm.tipo_reporte = null
        vm.listDocRads = [];
        activate();

        function activate() {
            $scope.titleReporte = '<i>Planilla - Entrega de documentos</i>';
            vm.tipo_reporte = $stateParams.tipo_rep;
            vm.listDocRads = $stateParams.list_rad ? $stateParams.list_rad : [];

            var codigo = $stateParams.tipo_rad;
            console.log('###---## ListPrintgestion');
            console.log($stateParams);

            verLoading();
            if ($stateParams.tipo_rep == 'list' || $stateParams.tipo_rep == 'ver' || $stateParams.tipo_rep == 'print') {
                verLoading();
                var url = 'gestion_documental/gestion/printPlanillaDia/';
                url = $stateParams.tipo_rep == 'print' ? 'radicacion/pqte_impresos/printPlanilla/' : url;
                if (vm.listDocRads.length <= 0) {
                    AdmService.fnGetData(url + vm.tipo_reporte + '/' + codigo).then(function (dts) {
                        vm.listDocRads = dts.data;
                        swal.close()
                    });
                } else {
                    swal.close()
                }
            } else if ($stateParams.tipo_rep == 'pdf') {
                AdmService.fnGetPdf('gestion_documental/gestion/printPlanillaDia/pdf/' + $stateParams.tipo_rad).then(function (data) {
                    var file = new Blob([data], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    document.getElementById('visualizador').setAttribute('src', fileURL);
                    swal.close()
                });
            } else {
                swal.close()
            }
        }
    }
})();