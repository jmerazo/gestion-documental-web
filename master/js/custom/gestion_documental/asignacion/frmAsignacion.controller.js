(function () {
    'use strict';
    angular
        .module('app.gestion')
        .controller('asignaController', asignaController);


    asignaController.$inject = ['$rootScope', '$stateParams',
        'FuncionariosService', 'servAsignacionFunc', '$localStorage'];

    function asignaController($rootScope, $stateParams, servFuncionarios, $servicioAsigna, $storage) {
        var vm = this;
        vm.dtsRad = null;

        activate();

        function activate() {
            vm.dataFunc = [];
            vm.dataFuncAsignados = [];
            vm.pag_actual = 1;
            vm.cnfUser = $rootScope.user;
            vm.fnAddFuncionario = AddFuncionario;
            vm.eliminarAsignacion = deleteFuncionario;
            vm.permAsigna = permAsigna;
            var codRadicado = $stateParams.codigoRad;

            vm.totalResponsables = 0;
            vm.totalLectores = 0;

            swal.close()

            $rootScope.activetab = $stateParams.tab || '';
            vm.dtsRad = angular.fromJson($rootScope.$storage.getItem("gesdDoc"));

            servFuncionarios.getFuncionarios().then(function (rest) {
                vm.dataFunc = rest.data;
            });
            $servicioAsigna.getFuncAsignados(codRadicado).then(function (rest) {
                vm.dataFuncAsignados = rest.data;
                vm.totalResponsables = vm.dataFuncAsignados.filter(func => func.tipo == 1).length;
                vm.totalLectores = vm.dataFuncAsignados.filter(func => func.tipo == 0).length;
            });

            function AddFuncionario(dts, tipo) {
                vm.btnCopia = true;
                var pos = vm.dataFuncAsignados.findBy('id', dts.id);
                if (pos !== -1) {
                    return;
                }
                verLoading();
                dts['tipo'] = tipo;

                $servicioAsigna.save({ 'dtsFun': angular.toJson(dts) }, codRadicado).then(function (rest) {
                    swal.close();
                    swal({
                        type: 'success',
                        title: '',
                        text: 'Asignación correcta al funcionario',
                    });
                    vm.btnCopia = false;
                    vm.dataFuncAsignados.push(dts);
                }, function (error) {
                    swal({
                        type: 'error',
                        title: '',
                        text: 'Error en la asignación a un funcionario',
                    });
                    vm.btnCopia = false;
                });
            }

            function deleteFuncionario(reg) {
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
                }).then(function (result) {
                    if (result.value) {
                        verLoading();
                        $servicioAsigna.eliminarFun(reg.pk).then(function (rest) {
                            swal.close();
                            if (rest.error == false) {
                                var pos = vm.dataFuncAsignados.findBy('pk', reg.pk)
                                vm.dataFuncAsignados.splice(pos, 1);
                            } else {
                                swal({
                                    type: 'error',
                                    title: '',
                                    text: rest.msg,
                                });
                            }
                        }, function (rest) {
                            swal({
                                type: 'error',
                                title: '',
                                text: rest.msg,
                            });
                        });
                    }
                });
            }

            function permAsigna(tipo) {
                if (tipo == 1) {/*Responsable*/
                    return true;
                    // return (vm.cnfUser.config.ventanilla.toString().trim().length > 0)
                } else {
                    return false;
                    //return vm.dataFuncAsignados.findBy('id',vm.cnfUser.codFun)!==-1 || vm.cnfUser.config.ventanilla.toString().trim().length>0
                }
            }

        }
    }
})();
