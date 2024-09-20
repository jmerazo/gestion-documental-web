(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('HistorialController', HistorialController)


    HistorialController.$inject = ['$rootScope', '$scope', '$stateParams', 'GestionDocumental'];

    function HistorialController($rootScope, $scope, $stateParams, servGes) {
        var vm = this;
        $rootScope.activetab = $stateParams.tab || ''
        // $scope.activeTab = 'tab1';
        console.log("desde gedoc tab hisy")
        console.log($stateParams);
        vm.dataHist = [];
        servGes.fnGetHistorico($stateParams.codigoRad).then(function (rest) {
            vm.dataHist = Object.freeze(rest.data) ;
        });
    }
})();
