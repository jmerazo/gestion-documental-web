/**=========================================================
 * Module: Generales.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.gestion')
        .controller('frmAnexosController', frmAnexosController);

    frmAnexosController.$inject = ['$rootScope', 'Upload', '$scope', '$uibModalInstance', 'API_URL_SERV', '$localStorage',
        'datosFrm', 'servAnexosDoc', 'Remote'];

    function frmAnexosController($rootScope, Upload, $scope, $modal, API_URL_SERV,
                                 $localStorage, datosFrm, servAnexos, Remote) {
        var vm = this;
        vm.dtsRadicado = {};
        $scope.porcentajeCraga = 0;
        $scope.datos = {
            'id_tipo_anexo': null,
            'nro_documento': '',
            'fecha_documento': '',
            'observaciones': ''
        };


        angular.copy(datosFrm, vm.dtsRadicado)


        activate();

        ////////////////

        function activate() {
            /*Si el formulario es llamado desde el modulo de anexos o desde otra parte*/
            vm.origen = ($rootScope.activetab == 'tabanexos') ? 'mdanexos' : 'mdexterno';

            console.log(vm.origen)

            $scope.calendarOpen = calendarOpen;
            $scope.opened = false;
            $scope.dateOptions = {
                //dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(2016, 1, 1),
                startingDay: 1
            };

            $scope.listTipoDocs = [];
            var DstRad = {
                nro_rd: vm.dtsRadicado.cod_radicado,
                pk: vm.dtsRadicado.pk,
                formulario: '',
                file: null
            }
            $scope.adjunto = null;

            Remote.get('md_auxiliares/tipo_anexos/combo').then(function (r) {
                $scope.listTipoDocs = r.data;
            });

            var dtsError = false;
            $scope.guardarFrm = function ($datos, file) {

                DstRad.formulario = angular.toJson($datos);
                DstRad.file = file;

                if (vm.origen == 'mdanexos') {
                    Upload.upload({
                        url: API_URL_SERV + 'entornos/anexos/save',
                        data: DstRad,
                    }).then(function (resp) {
                        if (!resp.data.error) {
                            swal({
                                type: 'success',
                                title: '',
                                text: 'Archivo subido completamente al servidor',
                            });
                            var dtsList = $datos
                            dtsList['nom_tp_doc'] = $("#id_tipo_anexo option:selected").text()
                            dtsList['codigo'] = resp.data.id_anexo
                            $modal.close(dtsList);
                        } else {
                            swal({
                                type: 'error',
                                title: 'Ups!',
                                text: resp.data.msg,
                            });
                        }

                    }, function (response) {
                        var msg = response.data.msg;
                        if (status == 401) {
                            msg = 'La sesión ha caducado'
                            $location.path('/login');
                        }
                        if (status == 403) {
                            msg = 'No tiene los privilegios sufucientes para ejecutar esta acción'
                        }
                        swal({
                            type: 'error',
                            title: 'Ups!',
                            text: msg,
                        });

                    }, function (evt) {
                        $scope.porcentajeCraga = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {
                    $modal.close(DstRad);
                }


            }


            $scope.cancelar = function () {
                $modal.dismiss('cancel');
            };

            function calendarOpen($e) {
                console.log('xxx');
                $scope.opened = true;
            }
        }


    }
})();
