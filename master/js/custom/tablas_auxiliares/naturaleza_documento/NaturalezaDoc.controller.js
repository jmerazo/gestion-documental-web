(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('NaturalezaDocController', NaturalezaDocController);

    NaturalezaDocController.$inject = ['$rootScope', '$http', '$scope', '$uibModal', 'Remote', 'NaturalDoc'];

    function NaturalezaDocController($rootScope, $http, $scope, $uibModal, Remote, NaturalDoc) {

        activate();

        function activate() {

            $scope.naturalDoc = NaturalDoc;

            // Inicio del paginador
            $scope.pageChanged = function () {
                NaturalDoc.cargarPagina($.param($scope.naturalDoc.configPagina())).then(function (rest) {
                    $scope.naturalDoc = NaturalDoc;
                }).catch(function (err) {
                    console.log("error al cargar pagina naturaleza docs: "+err);
                })
                ;
            };

            $scope.reloadGrid = function () {
                $scope.naturalDoc.pag_actual = 1;
                $scope.naturalDoc.cmp_orden = '';
                $scope.naturalDoc.orden = '';
                $scope.naturalDoc.txt_buscar = '';
                $scope.naturalDoc.cmp_buscar = 'all';
                $scope.pageChanged();
            }

            $scope.orden = function (campo) {
                $scope.naturalDoc.orden = ($scope.naturalDoc.cmp_orden == campo) ? !$scope.naturalDoc.orden : false;
                $scope.naturalDoc.cmp_orden = campo;
                $scope.naturalDoc.pag_actual = 1;
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
                        NaturalDoc.delete(codReg).then(function (data) {
                            swal.close();
                            console.log(data);
                            if (!data.error) {
                                var $posicion = $scope.naturalDoc.dtsPagina.findBy('pk', codReg);
                                $scope.naturalDoc.dtsPagina.splice($posicion, 1);
                                toast('success', data.msg)
                            }
                        })
                    }
                });
            }

            $scope.nuevoRegistro = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/naturaleza_documento/frm_natural_documento.html' + noCacheView(),
                    controller: 'frmNaturalezaDocController',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        datosFrm: function () {
                            return undefined;
                        }
                    }
                });

                modalInstance.result
                    .then(function (parametros) {
                        console.log("datos desde frmNaturalezaDoc al crear: "+JSON.stringify(parametros));
                        $scope.naturalDoc.dtsPagina.push(parametros.natuDoc);
                    })
                    .catch(function (err) {
                        console.log("error al crear naturaleza doc: "+err);
                    })
                ;
            }

            $scope.editarFrm = function (registro) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/auxiliares/naturaleza_documento/frm_natural_documento.html' + noCacheView(),
                    controller: 'frmNaturalezaDocController',
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
                    //console.log("datos desde frmNatuDoc: "+JSON.stringify(infoFrm));
                    var $posicion = $scope.naturalDoc.dtsPagina.findBy('pk', infoFrm.natuDoc.pk);
                    $scope.naturalDoc.dtsPagina[$posicion] = infoFrm.natuDoc;
                }).catch(function (err) {
                    console.log("error al editar naturaleza doc: "+err);
                })
                ;
            };

        }
    }
})();