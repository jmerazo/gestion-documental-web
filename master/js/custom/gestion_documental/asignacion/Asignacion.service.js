(function () {
        'use strict';
        angular
            .module('app.gestion')
            .factory('servAsignacionFunc', servAsignacionFunc);
        servAsignacionFunc.$inject = ['API_URL_SERV', '$http', '$q'];

        function servAsignacionFunc(API_URL_SERV, $http, $q) {

            var self = {
                getFuncAsignados: listAsignados,
                eliminarFun: fnDelete,
                save: saveAsigna,
            };
            return self;

            function listAsignados(codigo) {
                var d = $q.defer();
                $http.get(API_URL_SERV + 'gestion_documental/asignacion/list_asignados/' + codigo).then(function (results) {
                    d.resolve(results.data);
                }, function (err) {
                    d.reject(err);
                    console.log('Fallo')
                });
                return d.promise;
            }

            function saveAsigna($dts, codigo) {
                var d = $q.defer();
                $http.post(API_URL_SERV + 'gestion_documental/asignacion/save/' + codigo, $.param($dts)).then(function (results) {
                    d.resolve(results.data);
                }, function (err) {
                    d.reject(err);
                    console.log('Fallo')
                })
                return d.promise;
            }


            function fnDelete(codigo) {
                var d = $q.defer();
                $http.delete(API_URL_SERV + 'gestion_documental/asignacion/elimina/' + codigo).then(function (results) {
                    d.resolve(results.data);
                }, function (err) {
                    d.reject(err);
                    console.log('Fallo')
                });
                return d.promise;
            };
        }

    }

)();