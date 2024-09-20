(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('repListGral', repListGral)


    repListGral.$inject = ['$rootScope', '$scope', '$uibModal', 'GestionDocumental', '$localStorage'];

    function repListGral($rootScope, $scope, $uibModal, GestionDocumental, store) {
        var vm = this;

        activate();

        function activate() {

            vm.permAsigna = permAsigna;
            vm.cnfUser = $rootScope.user;
            vm.exportarXls = exportarXls;

            $scope.GestioDoc = GestionDocumental;
            GestionDocumental.getTipoDocs();
            GestionDocumental.misOficinas();

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
            vm.filtroFomr = store.searchReporteGeneral || {};

            // Inicio del paginador

            $scope.pageChanged = function (dts) {
                if (!dts) {
                    dts = vm.filtroFomr;
                }
                console.log("dts>>", dts)
                if (dts.fecFin && dts.fecInicio) {
                    dts.fecFin = moment(dts.fecFin).format('YYYY-MM-DD');
                    dts.fecInicio = moment(dts.fecInicio).format('YYYY-MM-DD');
                }

                GestionDocumental.cargarPagina($.param($scope.GestioDoc.configPagina(dts))).then(function (rest) {
                    $scope.GestioDoc = GestionDocumental;
                });
            };

            $scope.reloadGrid = function () {
                $scope.GestioDoc.pag_actual = 1;
                $scope.GestioDoc.cmp_orden = '';
                $scope.GestioDoc.orden = 'true';
                $scope.GestioDoc.txt_buscar = '';
                $scope.GestioDoc.cmp_buscar = 'all';
                $scope.pageChanged({});
            }

            $scope.orden = function (campo) {
                $scope.GestioDoc.orden = ($scope.GestioDoc.cmp_orden == campo) ? !$scope.GestioDoc.orden : false;
                $scope.GestioDoc.cmp_orden = campo;
                $scope.GestioDoc.pag_actual = 1;
                $scope.dtsCategoria = undefined;
                $scope.dtsTipoDoc = undefined;
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.buscar = function () {
                $scope.GestioDoc.pag_actual = 1;
                $scope.GestioDoc.pag_actual = 1;
                store.searchReporteGeneral = vm.filtroFomr;
                $scope.pageChanged(vm.filtroFomr);
            };

            $scope.pageChanged();

            // Final del paginador

            function permAsigna() {
                return (vm.cnfUser.config.ventanilla && vm.cnfUser.config.ventanilla.toString().trim().length > 0)
            }


            function exportarXls() {
                console.log(JSON.stringify(vm.filtroFomr));

                var filtro = JSON.stringify(vm.filtroFomr);

                var $code = Base64.encode(filtro);
                var token = Base64.encode(store.kt.toString());
                window.open($rootScope.$URL_API + 'reportes/reportelista/exportarxls/' + $code + '/' + token, '_new')

            }

        }
    }
})();
