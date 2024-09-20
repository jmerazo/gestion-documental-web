(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('viewDocumento', viewDocumento);

    viewDocumento.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'GestionDocumental', 'API_URL_SERV', '$localStorage'];

    function viewDocumento($rootScope, $scope, $state, $stateParams, servDocumento, API_URL_SERV, $localStorage) {
        var vm = this;
        vm.dtsRad = {};
        vm.view = $stateParams.codigoRad;
        vm.descargarDocumento = downloadDocumento;
        activate();

        function activate() {
            $rootScope.activetab = $stateParams.tab || ''

            swal.close()
            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));
            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'gestion_documental/gestion/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            let url = "http://docs.google.com/gview?url=" + urlArchivo + '&embedded=true';

            document.getElementById('conten_documents').setAttribute('src', url);
            /*
                        servDocumento.fnGetPdf('gestion_documental/gestion/verArchivo/' + $stateParams.codigoRad).then(function (data) {
                            console.log(data);
                            var file = new Blob([data], { type: 'application/pdf' });
                            var fileURL = URL.createObjectURL(file);
            
                            document.getElementById('conten_documents').setAttribute('src', fileURL);
                        });*/


        }
        function downloadDocumento() {
            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));
            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'gestion_documental/gestion/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            window.open(urlArchivo, '_new')
        }
    }
})();