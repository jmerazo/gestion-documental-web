(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('SeriesCarpetasController', SeriesCarpetasController);

    SeriesCarpetasController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'SeriesCarp'];

    function SeriesCarpetasController($rootScope, $http, $scope, $uibModal, Remote, SeriesCarp) {

        activate();

        function activate() {
            $scope.serieCarpeta = SeriesCarp;
            // Inicio del paginador
            $scope.pageChanged = function () {
                SeriesCarp.cargarPagina($.param($scope.serieCarpeta.configPagina())).then(function (rest) {
                    $scope.serieCarpeta = SeriesCarp;
                });
            };

            $scope.reloadGrid = function () {
                $scope.serieCarpeta.pag_actual = 1;
                $scope.serieCarpeta.cmp_orden = '';
                $scope.serieCarpeta.orden = '';
                $scope.serieCarpeta.txt_buscar = '';
                $scope.serieCarpeta.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.serieCarpeta.orden = ($scope.serieCarpeta.cmp_orden == campo) ? !$scope.serieCarpeta.orden : false;
                $scope.serieCarpeta.cmp_orden = campo;
                $scope.serieCarpeta.pag_actual = 1;
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
                        SeriesCarp.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.serieCarpeta.dtsPagina.findBy('pk', codReg);
                                $scope.serieCarpeta.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/series_carpetas/frm_series_carpetas.html' + noCacheView(),
                    controller: 'frmCarpetasController',
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
                    $scope.serieCarpeta.dtsPagina.push(parametros.expediente);
                })
                ;
            }

            $scope.editarFrm = function (registro) {
                //console.log("datos desde frmseries: "+JSON.stringify($scope.serieCarpeta.dtsPagina));
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/series_carpetas/frm_series_carpetas.html' + noCacheView(),
                    controller: 'frmCarpetasController',
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
                    //console.log("datos desde frmseries: "+JSON.stringify(infoFrm));
                    var $posicion = $scope.serieCarpeta.dtsPagina.findBy('pk', infoFrm.expediente.pk);
                    $scope.serieCarpeta.dtsPagina[$posicion] = infoFrm.expediente;
                }).catch(function (err) {
                    console.log("error al editar carpetas: "+err);
                })
                ;
            };

        }
    }

})();