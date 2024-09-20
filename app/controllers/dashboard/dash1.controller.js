(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dash1Controller', dash1Controller);

    dash1Controller.$inject = ['$scope', 'Dashboards', 'Colors', '$rootScope', '$localStorage', '$state'];

    function dash1Controller($scope, Dashboards, Colors, $rootScope, store, $state) {
        var vm = this;

        activate();

        function activate() {
            vm.datosGraficoRadicadosXMes = {};
            vm.anio = 2020;

            Dashboards.fnGetData('dashboards/principal/radicadosxMes/' + vm.anio).then(function (rta) {
                vm.datosGraficoRadicadosXMes = rta.data;
            });

            vm.chartOptionsXMes = {
                title: {
                    display: true,
                    text: 'Número de radicados por mes en el año ' + vm.anio
                },
                plugins: {
                    labels: { render: 'value' }
                }
            };

            vm.datasetOverride = [
                { backgroundColor: Colors.randomColor(), borderColor: Colors.byPoss(0), borderWidth: 1 }
            ];
        }
    }
})();
