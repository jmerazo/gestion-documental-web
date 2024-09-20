/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);
    LoginFormController.$inject = ['$rootScope', '$http', '$state', '$localStorage', 'API_URL_SERV', 'API_URL_SERV2'];

    function LoginFormController($rootScope, $http, $state, $store, API_URL_SERV, API_URL_SERV2) {
        var vm = this;
        activate();

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.login = function () {
                vm.authMsg = '';
                if (vm.loginForm.$valid) {

                    $http.post(API_URL_SERV + 'admin/aut/aut', $.param({
                        usuario: vm.account.email,
                        pwd: vm.account.password
                    })).then(function (response) {
                        $store.kt = response.data.tk;
                        $rootScope.user = response.data.dts;
                        /*$http.post(`${API_URL_SERV2}login`, {
                                username: vm.account.email,
                                password: vm.account.password
                            }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        ).then(function (r) {
                            $rootScope.$storage.setItem('access_token', r.data.access_token);
                            $rootScope.$storage.setItem('refresh_token',r.data.refresh_token);
                            $rootScope.$storage.setItem('token_type', r.data.token_type);
                            $rootScope.$storage.setItem('expires_in', r.data.expires_in);

                            $state.go('app.singleview');
                        });*/
                        $state.go('app.singleview');

                    }, function (rest) {
                        vm.authMsg = rest.data.msg || 'Error en la conexion con el servidor';
                    });


                } else {
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();
