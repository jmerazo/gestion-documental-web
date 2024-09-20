(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('TipoAnexosController', TipoAnexosController)

    TipoAnexosController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'TipoAnexos'];

    function TipoAnexosController($rootScope, $http, $scope, $uibModal, Remote, TipoAnexos) {

        activate();

        function activate() {

            $scope.tipoanexos = TipoAnexos;
            // Inicio del paginador

            $scope.pageChanged = function () {
                TipoAnexos.cargarPagina($.param($scope.tipoanexos.configPagina())).then(function (rest) {
                    $scope.tipoanexos = TipoAnexos;
                });
            };

            $scope.reloadGrid = function () {
                $scope.tipoanexos.pag_actual = 1;
                $scope.tipoanexos.cmp_orden = '';
                $scope.tipoanexos.orden = '';
                $scope.tipoanexos.txt_buscar = '';
                $scope.tipoanexos.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.tipoanexos.orden = ($scope.tipoanexos.cmp_orden == campo) ? !$scope.tipoanexos.orden : false;
                $scope.tipoanexos.cmp_orden = campo;
                $scope.tipoanexos.pag_actual = 1;
                $scope.pageChanged();
            }

            $scope.pageChanged();

            // Final del paginador

            $scope.eliminar = function (codReg, $pos) {

                swal({
                    title: 'Está seguro de eliminar el registro?',
                    text: 'No podras recuperar este registro!',
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
                        verLoading()
                        TipoAnexos.delete(codReg).then(function (data) {
                            swal.close();
                            if (!data.error) {
                                var $posicion = $scope.tipoanexos.dtsPagina.findBy('ide_tipo_anexo', codReg);
                                $scope.tipoanexos.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {
                console.log("entro ")

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipo_anexos/frm_tipo_anexos.html' + noCacheView(),
                    controller: 'frmTipoAnexoCtroller',
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
                    //console.log("datos desde frmRoles al crear: "+JSON.stringify(parametros));
                    $scope.tipoanexos.dtsPagina.push(parametros.anexo);
                    //console.log("dtsPagina luego de crear tipo de anexo: "+JSON.stringify($scope.tipoanexos.dtsPagina));
                });
            }
            $scope.editarFrm = function (registro) {
                //console.log(registro);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipo_anexos/frm_tipo_anexos.html' + noCacheView(),
                    controller: 'frmTipoAnexoCtroller',
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
                    console.log("datos desde frmtipoanexos: "+JSON.stringify(infoFrm));
                    var $posicion = $scope.tipoanexos.dtsPagina.findBy('pk', infoFrm.anexo.pk);
                    $scope.tipoanexos.dtsPagina[$posicion] = infoFrm.anexo;
                }).catch(function (err) {
                    console.log("error al editar tercero: "+err);
                })
                ;
            };
        }
    }

})();