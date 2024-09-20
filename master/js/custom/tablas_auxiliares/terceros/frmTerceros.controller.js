(function () {
    'use strict';
    angular
        .module('app.auxiliares')
        .controller('frmTercerosCtroller', frmTercerosCtroller);

    frmTercerosCtroller.$inject = ['$scope', '$uibModalInstance', 'datosFrm', 'Terceros', 'Remote'];

    function frmTercerosCtroller($scope, $uibModalInstance, datosFrm, Terceros, Remote) {

        $scope.frm_title = 'Nuevo terceros';

        $scope.datos = {};
        $scope.dtsMunicipios = {};
        $scope.envioDatos = {};

        var accion = 'nuevo';

        $scope.list_tipo_identificacion;
        $scope.listMunicipios;
        $scope.TipoTercero = [
            {
                id: 1,
                nom: "Persona natural"
            },
            {
                id: 2,
                nom: "Entidad"
            }
        ];

        Remote.get('comun/tipo_identificacion/combo').then(function (r) {
            $scope.list_tipo_identificacion = r.data;
        });
        Remote.get('md_auxiliares/divipola/combo').then(function (r) {
            //console.log("lo que llega de divipola: "+ JSON.stringify( r.data ));
            $scope.listMunicipios = r.data;
            if (accion == 'edit') {
                getMunicipio(datosFrm.ide_divipola_tercero);
            }
        });

        /*------------- funcion para datos municipio -----------*/

        function getMunicipio(idMunicipio) {
            var encontrado = 0;
            //console.log("municipios: "+JSON.stringify($scope.listMunicipios));
            for (var i = 0; i < $scope.listMunicipios.length; i++) {
                if (idMunicipio == $scope.listMunicipios[i].id) {
                    console.log("datos municipio: " + JSON.stringify($scope.listMunicipios[i]));
                    $scope.dtsMunicipios = $scope.listMunicipios[i];
                    encontrado = 1;
                    break;
                }
            }
            if (encontrado == 0) {
                console.log("no encontro municipio");
            }
        };

        /*------------------------------------------------------*/

        if (!angular.isUndefined(datosFrm)) {
            console.log("datos anteriores para editar: " + JSON.stringify(datosFrm));
            angular.copy(datosFrm, $scope.datos)
            $scope.frm_title = 'Edición del registro';
            accion = 'edit';
        }

        $scope.selectXyz = function (xt, rt) {
            $scope.datos.ide_divipola_tercero = xt.id
        }

        $scope.guardarFrm = function (datosFrm) {
            console.log('--')
            console.log(datosFrm)
            if (!$scope.frm_terceros.$valid) {
                swal({
                    title: "Ups...!",
                    text: "Los campos en rojo son obligatorios!",
                    type: "warning",
                    confirmButtonText: "Ok",
                    focusConfirm: true,
                    showCancelButton: false,
                });
                return false;
            }
            swal.showLoading()
            if (accion == 'nuevo') {
                console.log("datos al crear tercero: " + datosFrm);
                Terceros.add($.param(datosFrm)).then(function (data) {
                    $scope.envioDatos = {
                        tercero: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro agregado')
                })

            } else if (accion == 'edit') {
                console.log("datos al editar tercero: " + datosFrm);
                Terceros.update($.param(datosFrm), datosFrm.pk).then(function (data) {
                    $scope.envioDatos = {
                        tercero: datosFrm,
                        respuesta: data
                    }
                    $uibModalInstance.close($scope.envioDatos);
                    swal.close();
                    toast('success', 'Registro editado')
                })
            }
        };
        $scope.cancelar = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();
