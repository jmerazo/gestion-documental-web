(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state'];
    function RegisterFormController($http, $state) {
        var vm = this;

        activate();

        function activate() {
          vm.account = {};
          vm.authMsg = '';

          vm.register = function() {
            vm.authMsg = '';

            if(vm.registerForm.$valid) {
              $http
                .post('api/account/register', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  if (!response.account) {
                    vm.authMsg = response;
                  } else {
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            } else {
              vm.registerForm.account_email.$dirty = true;
              vm.registerForm.account_password.$dirty = true;
              vm.registerForm.account_agreed.$dirty = true;
            }
          };
        }
    }
})();
