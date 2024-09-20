(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage', '$state', '$uibModal'];

    function settingsRun($rootScope, $localStorage, $state, $uibModal) {

        $rootScope.logoUt = function () {

            if ($rootScope.socketIdUser) {
                $rootScope.socket.close();
                delete $rootScope.socketIdUser;
            }
            delete $localStorage.kt;
            delete $localStorage.access_token ;
            delete $localStorage.refresh_token ;
            delete $localStorage.token_type ;
            delete $localStorage.expires_in ;

            $state.go('page.login')
        };
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
        // User Settings
        // -----------------------------------
        $rootScope.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'app/img/user/02.jpg'
        };
        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function () {
            $rootScope.$broadcast('toggleUserBlock');
        };

        // Global Settings
        // -----------------------------------
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

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');

        // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
        // if( angular.isDefined($localStorage.layout) )
        //   $rootScope.app.layout = $localStorage.layout;
        // else
        //   $localStorage.layout = $rootScope.app.layout;
        //
        // $rootScope.$watch('app.layout', function () {
        //   $localStorage.layout = $rootScope.app.layout;
        // }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
            if (newValue === false)
                $rootScope.$broadcast('closeSidebarMenu');
        });
    }

})();
