(function () {
    'use strict';
    angular
        .module('app.radicacion')
        .controller('viewRadicado', viewRadicado);


    viewRadicado.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AdminRadicacionServ',
        'API_URL_SERV', '$localStorage'];

    function viewRadicado($rootScope, $scope, $state, $stateParams, Radicado,
        API_URL_SERV, $localStorage) {
        var vm = this;
        activate();
        console.log('##############');


        vm.view = $stateParams.codigoRad;
        vm.dtsRad = {};
        vm.descargarDocumento = downloadDocumento;

        //vm.urlArchivo = API_URL_SERV + 'radicacion/radicar/verArchivo/' + vm.view;

        function activate() {
            $rootScope.activetab = $stateParams.tab || ''

            verLoading();
            Radicado.fnGetRadicado($stateParams.codigoRad).then(function (dts) {
                /*$rootScope.$storage.setItem('gesdDoc', angular.toJson(dts.data));*/
                vm.dtsRad = dts.data;
                swal.close()
            });

            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'radicacion/radicar/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            let url = "http://docs.google.com/gview?url=" + urlArchivo + '&embedded=true';
            document.getElementById('conten_documents').setAttribute('src', url);


            /*
                        Radicado.fnGetPdf('radicacion/radicar/verArchivo/' + $stateParams.codigoRad).then(function (data) {
                            console.log(data);
                            var file = new Blob([data], {type: 'application/pdf'});
                            var fileURL = URL.createObjectURL(file);
            
                            document.getElementById('conten_documents').setAttribute('src', fileURL);
                            //swal.close()
                        });*/
        }

        function downloadDocumento() {
            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));
            var token = Base64.encode($localStorage.kt.toString());
            let urlArchivo = API_URL_SERV + 'radicacion/radicar/verArchivo/' + $stateParams.codigoRad + '/2' + '/' + token;
            window.open(urlArchivo, '_new')
        }

    }
})();