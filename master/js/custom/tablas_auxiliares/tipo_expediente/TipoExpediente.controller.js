(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('TipoExpedientesController', TipoExpedientesController);

    TipoExpedientesController.$inject = ['$rootScope', '$http', '$scope', '$uibModal','Remote','Expediente'];

    function TipoExpedientesController($rootScope, $http, $scope, $uibModal,Remote,Expediente){

        activate();

        function activate() {

            $scope.tipoexpediente = Expediente;
            // Inicio del paginador
            $scope.pageChanged = function () {
                Expediente.cargarPagina($.param($scope.tipoexpediente.configPagina())).then(function (rest) {
                    $scope.tipoexpediente = Expediente;
                });
            };

            $scope.reloadGrid = function () {
                $scope.tipoexpediente.pag_actual = 1;
                $scope.tipoexpediente.cmp_orden = '';
                $scope.tipoexpediente.orden = '';
                $scope.tipoexpediente.txt_buscar = '';
                $scope.tipoexpediente.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.tipoexpediente.orden = ($scope.tipoexpediente.cmp_orden == campo) ? !$scope.tipoexpediente.orden : false;
                $scope.tipoexpediente.cmp_orden = campo;
                $scope.tipoexpediente.pag_actual = 1;
                $scope.pageChanged();
            }

            $scope.pageChanged();

            $scope.datosLista = {};


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
                        Expediente.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.tipoexpediente.dtsPagina.findBy('pk', codReg);
                                $scope.tipoexpediente.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {
                console.log("entro ")
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipos_expedientes/frm_tipos_expedientes.html' + noCacheView(),
                    controller: 'frmTipoExpedientesController',
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
                    //console.log("datos desde frmTipoEXp al crear: "+JSON.stringify(parametros));
                    $scope.tipoexpediente.dtsPagina.push(parametros.expediente);
                });
            }

            $scope.editarFrm = function (registro) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/tipos_expedientes/frm_tipos_expedientes.html' + noCacheView(),
                    controller: 'frmTipoExpedientesController',
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
                    //console.log("datos desde frmtipoexpediente: "+JSON.stringify(infoFrm));
                    var $posicion = $scope.tipoexpediente.dtsPagina.findBy('pk', infoFrm.expediente.pk);
                    $scope.tipoexpediente.dtsPagina[$posicion] = infoFrm.expediente;
                }).catch(function (err) {
                    console.log("error al editar tercero: "+err);
                })
                ;
            };

        }
    }

})();