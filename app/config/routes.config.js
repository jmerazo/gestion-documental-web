(function () {
    'use strict';

    angular
    .module('app.routes')
    .config(routesConfig);

    routesConfig.$inject = [
        '$stateProvider', 
        '$locationProvider', 
        '$urlRouterProvider', 
        'RouteHelpersProvider', 
        '$httpProvider', 
        'jwtInterceptorProvider', 
        'jwtOptionsProvider', 
        '$qProvider'
    ];

    function routesConfig(
        $stateProvider, 
        $locationProvider, 
        $urlRouterProvider, 
        helper, 
        $httpProvider, 
        jwtInterceptorProvider, 
        jwtOptionsProvider, 
        $qProvider) {

        $locationProvider.html5Mode({ enabled: false });
        $qProvider.errorOnUnhandledRejections(false);
        
        jwtOptionsProvider.config({
            whiteListedDomains: [
                'web.prointelsi.com', 
                'prointelsi.com', 
                'gesdoc.api.prointelsi.com', 
                'api.gesdoc.local', 
                'apigesdoc.putumayo.gov.co',
            ],
            authHeader: 'Jwt'
        });

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
        $httpProvider.interceptors.push('ManejoErrorsHttp');
        jwtInterceptorProvider.tokenGetter = function ($localStorage) {
            return $localStorage.kt;
        };
        $httpProvider.interceptors.push('jwtInterceptor');
        jwtInterceptorProvider.forceHeadersUpdate = true;

        // Default route
        $urlRouterProvider.otherwise('/page/login');

        // Define routes
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('moment', 'modernizr', 'icons', 'SweetAlert2', 'whirl')
            })
            .state('app.singleview', {
                url: '/singleview',
                title: 'Single View',
                controller: 'dash1Controller',
                controllerAs: 'dash1',
                templateUrl: helper.basepath('dashboard/radicacion.html'),
                resolve: helper.resolveFor('chartjs', 'chart.js'),
            })
            .state('app.radica-entrada', {
                url: '/rad_entrada',
                title: 'Radicar entrada',
                templateUrl: helper.basepath('radicacion/frm_radicar_pricipal.html'),
                controller: 'EntradaController',
                resolve: helper.resolveFor('inputmask', 'moment', 'ui.select', 'qrcode', 'moment-business', 'print-area'),
            })
            // Otros estados...
            .state('app.mailbox', {
                url: '/mailbox',
                title: 'Mailbox',
                templateUrl: helper.basepath('radicacion/correo/mailbox.html'),
                controller: 'MailboxController'
            })
            .state('app.usuarios', {
                url: '/usuarios',
                title: 'Usuarios',
                templateUrl: helper.basepath('administracion/usuarios/inicio.html'),
                controller: 'UsuariosController',
                resolve: helper.resolveFor('ui.select')
            })
            .state('aux.tipo_expediente', {
                url: '/tipos-expedientes',
                title: 'Tipos expedientes',
                controller: 'TipoExpedientesController',
                templateUrl: helper.basepath('auxiliares/tipos_expedientes/inicio.html'),
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/plantillas/login.html'
            })
            .state('page.register', {
                url: '/register',
                title: 'Register',
                templateUrl: 'app/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: 'Recover',
                templateUrl: 'app/pages/recover.html'
            })
            .state('page.lock', {
                url: '/lock',
                title: 'Lock',
                templateUrl: 'app/pages/lock.html'
            })
            .state('page.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: 'app/pages/404.html'
            })
            .state('page.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: 'app/pages/500.html'
            })
            .state('page.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: 'app/pages/maintenance.html'
            })
            .state('page.unautorize', {
                url: '/no-autorizado',
                title: 'Acceso restringido',
                templateUrl: helper.basepath('acceso_restringido.html'),
                controller: ['$scope', '$stateParams', '$rootScope', '$urlRouterProvider', function ($scope, $params, $rootScope, stateProvider) {
                    console.log(stateProvider);
                    $scope.volver = $params.value;
                    $scope.rutaAnt = '';
    
                }],
                params: {
                    volver: {
                        value: true,
                        squash: true
                    }
                },
            })
    }
})();
