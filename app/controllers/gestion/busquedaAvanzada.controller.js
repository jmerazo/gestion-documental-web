(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('busquedaAvanzadaController', busquedaAvanzadaController)

    busquedaAvanzadaController.$inject = ['$scope', 'busqueda'];

    function busquedaAvanzadaController($scope, busqueda) {
        var vm = this;
        activate();

        function activate() {
            $scope.servBusqueda = busqueda;
            $scope.masCampos = false;
            $scope.search = "";
            $scope.resultados = {};
            $scope.usu = true;
            $scope.verTabla = false;

            // Paginador
            $scope.pageChanged = function () {
                busqueda.cargarPagina($.param($scope.servBusqueda.configPagina())).then(function (rest) {
                    $scope.servBusqueda = busqueda;
                });
            };

            $scope.reloadGrid = function () {
                $scope.servBusqueda.pag_actual = 1;
                $scope.servBusqueda.cmp_orden = '';
                $scope.servBusqueda.orden = '';
                $scope.servBusqueda.txt_buscar = '';
                $scope.servBusqueda.cmp_buscar = 'all';
                $scope.pageChanged();
                $scope.usu = true;
                $scope.verTabla = false;
            }

            $scope.orden = function (campo) {
                $scope.servBusqueda.orden = ($scope.servBusqueda.cmp_orden == campo) ? !$scope.servBusqueda.orden : false;
                $scope.servBusqueda.cmp_orden = campo;
                $scope.servBusqueda.pag_actual = 1;
                $scope.pageChanged();
            }

            $scope.pulsar = function (tecla) {
                if (event.keyCode === 13 && !event.shiftKey) {
                    $scope.buscar();
                }
            }

            $scope.buscar = function () {
                if ($scope.search != "") {
                    if ($scope.masCampos == false) {
                        swal.showLoading();
                        $scope.servBusqueda.busqueda($scope.search, 1)
                            .then(function (datos) {
                                $scope.resultados = datos.data;
                                swal.close();
                                if (Object.keys($scope.resultados).length === 0) {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Oops...',
                                        html: 'No se encontro ningún archivo con: <strong>' + $scope.search + '</strong> !',
                                    })
                                } else {
                                    $scope.verTabla = true;
                                }
                            })
                            .catch(function (err) {
                                console.log("error al traer datos tipo consulta 1: " + err);
                            });
                    }
                } else {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...',
                        html: 'Debe escribir algo para poder buscar !',
                    })
                }
            }
        }
    }
})();
