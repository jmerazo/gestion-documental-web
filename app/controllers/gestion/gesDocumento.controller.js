(function () {
    'use strict';

    angular
        .module('app.gestion')
        .controller('gesDocumentoController', gesDocumentoController);

    gesDocumentoController.$inject = ['$rootScope', '$scope', '$stateParams'];

    function gesDocumentoController($rootScope, $scope, $stateParams) {
        var vm = this;
        $scope.activeTab = 'tab1';
        console.log("Desde gesDocumento", $stateParams);
    }
})();
