(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('TipoDocumentosController', TipoDocumentosController);

    TipoDocumentosController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'Documento'];

    function TipoDocumentosController($rootScope, $http, $scope, $uibModal, Remote, Documento) {

        activate();

        function activate() {

            $scope.tipodocumento = Documento;

            // Inicio del paginador
            $scope.pageChanged = function () {
                Documento.cargarPagina($.param($scope.tipodocumento.configPagina())).then(function (rest) {
                    $scope.tipodocumento = Documento;
                });
            };

            $scope.reloadGrid = function () {
                $scope.tipodocumento.pag_actual = 1;
                $scope.tipodocumento.cmp_orden = '';
                $scope.tipodocumento.orden = '';
                $scope.tipodocumento.txt_buscar = '';
                $scope.tipodocumento.cmp_buscar = 'all';
                $scope.pageChanged();
            };

            $scope.orden = function (campo) {
                $scope.tipodocumento.orden = ($scope.tipodocumento.cmp_orden == campo) ? !$scope.tipodocumento.orden : false;
                $scope.tipodocumento.cmp_orden = campo;
                $scope.tipodocumento.pag_actual = 1;
                $scope.pageChanged();
            };

            $scope.pageChanged();

            $scope.datosLista = {};

            $scope.eliminar = function (codReg, $pos) {
                swal({
                    title: 'Está seguro de eliminar el registro?',
                    text: 'No podrás recuperar este registro!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Sí, Eliminar!',
                    closeOnConfirm: false,
                    focusCancel: true,
                    allowEnterKey: true,
                    cancelButtonText: 'No, Cancelar!',
                }).then((result) => {
                    if (result.value) {
                        verLoading();
                        Documento.delete(codReg).then(function (data) {
                            swal.close();
                            if (!data.error) {
                                var $posicion = $scope.tipodocumento.dtsPagina.findBy('pk', codReg);
                                $scope.tipodocumento.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg);
                            }
                        });
                    }
                });
            };

            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipo_documentos/frm_tipo_documento.html' + noCacheView(),
                    controller: 'frmTipoDocumentosController',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return undefined;
                        }
                    }
                });
                modalInstance.result.then(function (parametros) {
                    $scope.tipodocumento.dtsPagina.push(parametros.tipoDoc);
                });
            };

            $scope.editarFrm = function (registro) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipo_documentos/frm_tipo_documento.html' + noCacheView(),
                    controller: 'frmTipoDocumentosController',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return registro;
                        }
                    }
                });

                modalInstance.result.then(function (infoFrm) {
                    var $posicion = $scope.tipodocumento.dtsPagina.findBy('pk', infoFrm.tipoDoc.pk);
                    $scope.tipodocumento.dtsPagina[$posicion] = infoFrm.tipoDoc;
                }).catch(function (err) {
                    console.log("error al editar documento: " + err);
                });
            };
        }
    }
})();
