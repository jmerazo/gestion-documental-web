/**=========================================================
 * Module: Generales.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.generales')
        .controller('FileUploadController', FileUploadController);

    FileUploadController.$inject = ['FileUploader', '$scope', '$uibModalInstance', 'API_URL_SERV', '$localStorage', 'datosFrm'];

    function FileUploadController(FileUploader, $scope, $modal, API_URL_SERV, $localStorage, datosFrm) {
        var vm = this;
        vm.dtsRadicado = {};

        angular.copy(datosFrm, vm.dtsRadicado)
        activate();

        ////////////////

        function activate() {
            var DstRad = [{
                nro_rd: vm.dtsRadicado.cod_radicado,
                pk: vm.dtsRadicado.pk
            }]
            var dtsError = false;
            var uploader = vm.uploader = new FileUploader({
                url: API_URL_SERV + 'uploadfiles/upload/doc_radicado',
                queueLimit: 1,
                headers: {Jwt: "Bearer " + $localStorage.kt},
                formData: DstRad
            });

            // FILTERS
            /*
                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function () {
                                return this.queue.length < 1;
                            }
                        });
            */
            // CALLBACKS

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function (item) {
                dtsError = false;
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                var msg = response.msg;
                console.log(response);
                if (status == 401) {
                    msg = 'Se cierra la sesión por inactividad'
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
                dtsError = true;
                uploader.clearQueue();
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                //console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function () {
                console.info('onCompleteAll');
                if (!dtsError) {
                    swal({
                        type: 'success',
                        title: '',
                        text: 'Archivo subido completamente al servidor',
                    });
                    $modal.dismiss('cancel');
                }

            };

            $scope.cancelar = function () {
                $modal.dismiss('cancel');
            };
        }
    }
})();
