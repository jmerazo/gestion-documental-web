(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('repConsolidados', repConsolidados)


    repConsolidados.$inject = ['$scope', '$localStorage', 'API_URL_SERV', '$http', 'FileSaver'];

    function repConsolidados($scope, store, API_URL_SERV, $http, FileSaver) {
        var vm = this;

        activate();

        function activate() {

            vm.form = {};

            vm.listReportes = [
                {
                    cd: 'resumenRadicados',
                    nom_rep: 'Resumen radicados por Secretaría/Tipo Documento',
                    url: 'reportes/rep_basicos/rep_netosNomina',
                    expPdf: false,
                    expXlsUrl: true
                },
                {
                    cd: 'consolidadoRadicados',
                    nom_rep: 'Consolidado radicados por Secretaría/Oficina',
                    url: 'reportes/rep_basicos/rep_netosNomina',
                    expPdf: false,
                    expXlsUrl: true
                },
            ]

            $scope.opened = false;
            $scope.openedFin = false;

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false,
            }

            $scope.dateOptionsFecLim = {
                formatYear: 'yy',
                startingDay: 1,
                showWeeks: false,
                minDate: null,
                maxDate: new Date(),
            }

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
            $scope.formatFecha = 'yyyy-MM-dd'
            $scope.altInputFormats = ['d!/M!/yyyy', 'yyyy-M-!d'];

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            }
            $scope.openFin = function ($event) {

                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedFin = true;
            }
            $scope.changeFecInicio = function (fechaInicio) {
                $scope.dateOptionsFecLim.minDate = fechaInicio;
            }

            vm.exportarXls = function () {
                var data = {
                    fecInicio: moment(vm.form.fecInicio).format('YYYY-MM-DD'),
                    fecFin: moment(vm.form.fecFin).format('YYYY-MM-DD'),
                    reporte: vm.form.reporte['cd']
                }
                var filtro = JSON.stringify(data);

                var $code = Base64.encode(filtro);
                var token = Base64.encode(store.kt.toString());
                window.open(API_URL_SERV + 'reportes/reporte_cosolidado/consolidado/' + token + '/' + $code, '_new')
            }
        }

    }
})();
