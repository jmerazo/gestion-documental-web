(function () {
    'use strict';

    angular
        .module('app.gestion')
        .controller('GestionController', GestionController);

    GestionController.$inject = ['$rootScope', '$scope', '$uibModal', 'GestionDocumental', '$localStorage'];

    function GestionController($rootScope, $scope, $uibModal, GestionDocumental, store) {
        var vm = this;
        activate();

        function activate() {
            vm.permAsigna = permAsigna;
            vm.cnfUser = $rootScope.user;
            $scope.GestioDoc = GestionDocumental;

            GestionDocumental.misOficinas();
            GestionDocumental.getTipoDocs();

            vm.filtroFomr = store.searchGestion || {};
            if (vm.filtroFomr.pk && vm.filtroFomr.pk != vm.cnfUser.idu) {
                vm.filtroFomr = {};
            } else {
                vm.filtroFomr.pk = vm.cnfUser.idu;
            }

            GestionDocumental.getEstados().then(function (data) {
                vm.listEstados = data;
            });

            $scope.pageChanged = function (dts) {
                if (!dts) dts = vm.filtroFomr;
                GestionDocumental.cargarPagina($.param($scope.GestioDoc.configPagina(dts))).then(function () {
                    $scope.GestioDoc = GestionDocumental;
                });
            };

            $scope.pageChanged();
        }

        function permAsigna() {
            return (vm.cnfUser.config.ventanilla && vm.cnfUser.config.ventanilla.toString().trim().length > 0);
        }
    }
})();
