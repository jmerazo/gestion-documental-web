(function () {
    'use strict';
    angular
    .module('app.gestion')
    .controller('repInidicadores', repInidicadores)

    repInidicadores.$inject = ['$rootScope', '$scope', '$uibModal', 'GestionDocumental', '$localStorage'];

    function repInidicadores($rootScope, $scope, $uibModal, GestionDocumental, store) {
        var vm = this;

        activate();

        function activate() {

            vm.permAsigna = permAsigna;
            vm.cnfUser = $rootScope.user;
            vm.exportarXls = exportarXls;

            $scope.GestioDoc = GestionDocumental;
            GestionDocumental.getTipoDocs()

            $scope.dtsCategoria = undefined;
            $scope.dtsTipoDoc = undefined;

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
                console.log('holamundo>>');
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
                console.log("cambio", fechaInicio)
                $scope.dateOptionsFecLim.minDate = fechaInicio;

            }
            vm.filtroFomr = {};


            function permAsigna() {
                return (vm.cnfUser.config.ventanilla && vm.cnfUser.config.ventanilla.toString().trim().length > 0)
            }

            function exportarXls() {
                console.log(JSON.stringify(vm.filtroFomr));

                var filtro = JSON.stringify(vm.filtroFomr);

                var $code = Base64.encode(filtro);
                var token = Base64.encode(store.kt.toString());
                window.open($rootScope.$URL_API + 'reportes/reporte_indicador/exportarxls/' + $code + '/' + token, '_new')

            }

        }
    }
})();
