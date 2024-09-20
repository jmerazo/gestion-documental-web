(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('AdminRadicados', AdminRadicados);

    AdminRadicados.$inject = ['$rootScope', '$scope', '$uibModal', 'AdminRadicacionServ', '$stateParams'];

    function AdminRadicados($rootScope, $scope, $uibModal, AdmService, $stateParams) {
        var vm = this;
        activate();

        function activate() {
            $scope.AdminRadicados = AdmService;
            AdmService.getTipoDocs();
            $scope.dtsCategoria = undefined;
            $scope.dtsTipoDoc = undefined;
            $scope.verAnular = false;

            if ($rootScope.user.ide_rol == 3) {
                $scope.verAnular = true;
            }

            $scope.pageChanged = function (dts) {
                AdmService.cargarPagina($.param($scope.AdminRadicados.configPagina(dts))).then(function (rest) {
                    $scope.AdminRadicados = TipoAnexos;
                });
            };

            $scope.reloadGrid = function () {
                $scope.AdminRadicados.pag_actual = 1;
                $scope.AdminRadicados.cmp_orden = '';
                $scope.AdminRadicados.orden = 'true';
                $scope.AdminRadicados.txt_buscar = '';
                $scope.AdminRadicados.cmp_buscar = 'all';
                $scope.pageChanged({});
            }
        }
    }
})();
