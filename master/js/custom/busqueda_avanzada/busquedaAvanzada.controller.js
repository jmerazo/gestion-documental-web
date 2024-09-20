/**=========================================================
 * Module: busquedaAvanzada.js
 =========================================================*/
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

            // Inicio del paginador
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

            //$scope.pageChanged();

            $scope.pulsar = function (tecla) {
                if( event.keyCode === 13 && !event.shiftKey ){
                    $scope.buscar();
                }
            }

            $scope.buscar = function(){

                if( $scope.search != "" ){

                    if($scope.masCampos == false){

                        /// CONSULTA TIPO 1 ///

                        swal.showLoading()
                        console.log("Tipo consulta 1 es masCampo es False: "+$scope.masCampos);
                        $scope.servBusqueda.busqueda($scope.search,1)
                            .then(function (datos) {
                                $scope.resultados = datos.data;
                                console.log("resultado de la busqueda tipo 1: "+JSON.stringify($scope.resultados));
                                swal.close();
                                if( Object.keys($scope.resultados).length === 0 ){
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Oops...',
                                        html: 'No se encontro ningún archivo con: <strong>'+$scope.search+'</strong> !',
                                    })
                                }else{
                                    $scope.verTabla = true;
                                    //console.log("cantidad "+$scope.resultados.length);
                                    /*for (var i = 0; i< $scope.resultados.length; i++ ){
                                        //console.log("nombre pos "+i+" es "+$scope.resultados[i].Remite.nombre);
                                        if( $scope.resultados[i].Remite == null ){
                                            $scope.resultados[i].Remite = "copiado";
                                            $scope.resultados[i].Remite = $scope.resultados[i-1].Remite;
                                        }
                                    }*/
                                    $scope.resultados.shift(); //remueve el primero del arreglo
                                    //$scope.resultados.pop(); remueve el ultimo del arreglo
                                    for (var i = 0; i< $scope.resultados.length; i++ ){
                                        //console.log("nombre pos "+i+" es "+$scope.resultados[i].Remite.nombre);
                                        if( $scope.resultados[i].Remite.nombre == "" || $scope.resultados[i].Remite.nombre == null ){
                                            $scope.usu = false;
                                        }else if( $scope.resultados[i].Remite.entidad == "" || $scope.resultados[i].Remite.entidad == null ){
                                            $scope.resultados[i].Remite.entidad = "anonimo";
                                        }

                                    }
                                }

                            })
                            .catch(function (err) {

                                console.log("error al traer datos tipo consulta 1: "+err);

                            })
                        ;

                    }else{

                        /// CONSULTA TIPO 2 ///

                        swal.showLoading()
                        //console.log("Tipo consulta 2 es masCampo es True: "+$scope.masCampos);
                        $scope.servBusqueda.busqueda($scope.search,2)
                            .then(function (datos) {
                                $scope.resultados = datos.data;
                                console.log("resultado de la busqueda tipo 2: "+JSON.stringify( $scope.resultados ));
                                swal.close();
                                if( Object.keys($scope.resultados).length === 0 ){

                                    Swal.fire({
                                        type: 'error',
                                        title: 'Oops...',
                                        html: 'No se encontro ningún archivo con: <strong>'+$scope.search+'</strong> !',
                                    })
                                }else{
                                    $scope.verTabla = true;
                                    for (var i = 0; i< $scope.resultados.length; i++ ){

                                        if( $scope.resultados[i].Remite.nombre == "" || $scope.resultados[i].Remite.nombre == null ){
                                            $scope.usu = false;
                                        }else if( $scope.resultados[i].Remite.entidad == "" || $scope.resultados[i].Remite.entidad == null ){
                                            $scope.resultados[i].Remite.entidad = "anonimo";
                                        }

                                    }
                                }

                            })
                            .catch(function (err) {

                                console.log("error al traer datos tipo consulta 2: "+err);

                            })
                        ;
                    }

                }else{

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