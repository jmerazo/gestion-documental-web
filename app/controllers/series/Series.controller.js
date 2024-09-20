(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('SeriesController', SeriesController);

    SeriesController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'Series'];

    function SeriesController($rootScope, $http, $scope, $uibModal, Remote, Series) {

        activate();

        function activate() {
            $scope.serie = Series;
            // Inicio del paginador
            $scope.pageChanged = function () {
                Series.cargarPagina($.param($scope.serie.configPagina())).then(function (rest) {
                    $scope.serie = Series;
                });
            };

            $scope.reloadGrid = function () {
                $scope.serie.pag_actual = 1;
                $scope.serie.cmp_orden = '';
                $scope.serie.orden = '';
                $scope.serie.txt_buscar = '';
                $scope.serie.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.serie.orden = ($scope.serie.cmp_orden == campo) ? !$scope.serie.orden : false;
                $scope.serie.cmp_orden = campo;
                $scope.serie.pag_actual = 1;
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
                        Series.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.serie.dtsPagina.findBy('pk', codReg);
                                $scope.serie.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/series_documental/frm_series_documentales.html' + noCacheView(),
                    controller: 'frmSeriesController',
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
                    $scope.serie.dtsPagina.push(parametros.serie);
                });
            }

            $scope.editarFrm = function (registro) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/series_documental/frm_series_documentales.html' + noCacheView(),
                    controller: 'frmSeriesController',
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
                    var $posicion = $scope.serie.dtsPagina.findBy('pk', infoFrm.serie.pk);
                    $scope.serie.dtsPagina[$posicion] = infoFrm.serie;
                }).catch(function (err) {
                    console.log("error al editar series: "+err);
                });
            };
        }
    }
})();
