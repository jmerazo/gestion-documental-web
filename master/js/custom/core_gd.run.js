(function () {
    'use strict';

    angular
        .module('app.core_gd')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams'];

    function appRun($rootScope, $state, $stateParams) {
        $rootScope.estadosDocs = [{
            pk: 1,
            nombre: 'Nuevo',
            color: 'blue'
        },{
            pk: 15,
            nombre: 'Asignado',
            color: '#fb6e52'
        }]


    }

})();

