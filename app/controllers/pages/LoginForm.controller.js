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
            vm.account = {};
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
                        $state.go('app.singleview');
                    }, function (rest) {
                        vm.authMsg = rest.data.msg || 'Error en la conexión con el servidor';
                    });
                } else {
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();
