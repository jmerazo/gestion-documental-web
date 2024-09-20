(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('TercerosController', TercerosController);

    TercerosController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote','Terceros'];
    function TercerosController($rootScope, $http, $scope, $uibModal, Remote,Terceros) {
        activate();

        function activate() {

            $scope.terceros = Terceros;
            $scope.filtroFomr = {'parambus': {'nomcmp': 'all', 'valbus': ''}};

            $scope.pageChanged = function (dts) {
                if (!dts) {
                    dts = $scope.filtroFomr;
                }
                Terceros.cargarPagina($.param($scope.terceros.configPagina(dts))).then(function (rest) {
                    $scope.terceros = Terceros;
                });
            };

            $scope.buscar = function () {
                $scope.terceros.pag_actual = 1;
                $scope.pageChanged($scope.filtroFomr);
            };

            $scope.reloadGrid = function () {

                $scope.terceros.pag_actual = 1;
                $scope.terceros.cmp_orden = '';
                $scope.terceros.orden = '';
                $scope.terceros.txt_buscar = '';
                $scope.terceros.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.terceros.orden = ($scope.terceros.cmp_orden == campo) ? !$scope.terceros.orden : false;
                $scope.terceros.cmp_orden = campo;
                $scope.terceros.pag_actual = 1;
                $scope.pageChanged();
            }

            $scope.pageChanged();

            //Fin.

            $scope.eliminar = function (codReg) {
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
                        Terceros.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.terceros.dtsPagina.findBy('pk', codReg);
                                $scope.terceros.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/terceros/frm_terceros.html' + noCacheView(),
                    controller: 'frmTercerosCtroller',
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
                    console.log("lo que viene de frm crear terceros: "+JSON.stringify(parametros));
                    $scope.terceros.dtsPagina.push(parametros.tercero);
                }).catch(function (err) {
                    console.log("error al crear tercero: "+err);
                })
                ;
            }

            $scope.editarFrm = function (registro) {
                //console.log("datos pagina"+JSON.stringify($scope.terceros.dtsPagina));
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/terceros/frm_terceros.html' + noCacheView(),
                    controller: 'frmTercerosCtroller',
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
                        //console.log("datos desde frmterceros: "+JSON.stringify(infoFrm));
                        var $posicion = $scope.terceros.dtsPagina.findBy('pk', infoFrm.tercero.pk);
                        $scope.terceros.dtsPagina[$posicion] = infoFrm.tercero;
                    }).catch(function (err) {
                        console.log("error al editar tercero: "+err);
                    })
                ;

            };

        }
    }

})();
