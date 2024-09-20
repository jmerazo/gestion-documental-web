(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage', '$state', '$uibModal'];

    function settingsRun($rootScope, $localStorage, $state, $uibModal) {
        // Función para cerrar sesión
        $rootScope.logoUt = function () {
            if ($rootScope.socketIdUser) {
                $rootScope.socket.close();
                delete $rootScope.socketIdUser;
            }
            delete $localStorage.kt;
            delete $localStorage.access_token;
            delete $localStorage.refresh_token;
            delete $localStorage.token_type;
            delete $localStorage.expires_in;
            $state.go('page.login');
        };

        // Función para cambiar contraseña
        $rootScope.changePass = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/administracion/usuarios/frm_cambiar_pass.html' + noCacheView(),
                size: 'sm',
                backdrop: 'static',
                controller: 'frmPassChange',
                controllerAs: 'ctPass',
                keyboard: false,
                resolve: {
                    datosFrm: function () {
                        return {
                            'pk': $rootScope.user.idu,
                            'nombres': $rootScope.user.us_nom_apes,
                            'nombre_rol': ''
                        };
                    }
                }
            });
        };

        // Ajustes globales de la aplicación
        $rootScope.app = {
            name: 'GesDoc',
            description: 'Software de Gestión Documental',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: 'app/css/theme-b.css',
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp',
            rutaAnt: null
        };

        $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
            if (newValue === false) {
                $rootScope.$broadcast('closeSidebarMenu');
            }
        });
    }

})();
