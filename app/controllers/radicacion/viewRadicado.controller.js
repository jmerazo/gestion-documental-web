(function () {
    'use strict';
    angular
        .module('app.radicacion')
        .controller('viewRadicado', viewRadicado);

    viewRadicado.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AdminRadicacionServ', 'API_URL_SERV', '$localStorage'];

    function viewRadicado($rootScope, $scope, $state, $stateParams, Radicado, API_URL_SERV, $localStorage) {
        var vm = this;
        activate();
        vm.view = $stateParams.codigoRad;
        vm.dtsRad = {};
        vm.descargarDocumento = downloadDocumento;

        function activate() {
            $rootScope.activetab = $stateParams.tab || '';

            verLoading();
            Radicado.fnGetRadicado($stateParams.codigoRad).then(function (dts) {
                vm.dtsRad = dts.data;
                swal.close();
            });

            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'radicacion/radicar/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            let url = "http://docs.google.com/gview?url=" + urlArchivo + '&embedded=true';
            document.getElementById('conten_documents').setAttribute('src', url);
        }

        function downloadDocumento() {
            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'radicacion/radicar/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            window.open(urlArchivo, '_new');
        }
    }
})();
