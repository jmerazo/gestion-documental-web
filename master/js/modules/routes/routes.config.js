/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/
var RUTA_ABS = '';
head = null;
(function () {
    'use strict';

    angular
    .module('app.routes')
    .config(routesConfig)
    .factory('ManejoErrorsHttp', function ($q, $location, $localStorage, jwtHelper, $rootScope) {

        return {
            /*
            'request': function (r) {
                console.log(r);
                //r.headers["x-api-key"] = "00998-123-99912";
                return r;
            },*/
            'response': function (respuesta) {
                var storagedToken = $localStorage.kt,
                    receivedToken = respuesta.headers('Jwt');
                head = respuesta;

                //  console.log('token---...', receivedToken, respuesta.headers())

                /*                    console.log('-----------*-', receivedToken)
                                    if (receivedToken) {
                                        console.log(jwtHelper.decodeToken(storagedToken))
                                        console.log(jwtHelper.isTokenExpired(receivedToken))
                                        console.log(jwtHelper.decodeToken(receivedToken))
                                    }*/
                if (receivedToken && !jwtHelper.isTokenExpired(receivedToken) && (storagedToken !== receivedToken)) {
                    $localStorage.kt = receivedToken;
                    console.log('cambiando token de seguirdad actualizado xx')
                }
                return respuesta;

            },
            'requestError': function (rejection) {
                console.log('rejection - ', rejection);
                if (canRecover(rejection)) {
                    return responseOrNewPromise
                }
                return $q.reject(rejection);
            },
            // optional method
            'responseError': function (rejection) {
                swal.close();
                var $dts = angular.fromJson(rejection.data);
                var error = $dts.error;
                var msg = $dts.msg;
                if (rejection.status == 401) {
                    msg = 'La sesión ha caducado'
                    $location.path('/login');
                }
                if (rejection.status == 403) {
                    msg = 'No tiene los privilegios sufucientes para ejecutar esta acción'
                }

                if ($dts.error == 401) {
                    $rootScope.$state.go('page.unautorize');
                }

                console.info('*****-----*****')
                console.info(rejection, $dts)
                console.info('*****-----*****')


                swal({
                    type: 'error',
                    title: $dts.msg || "Error",
                    text: $dts.error_msg || "Comunicarse con el administrador",
                });
                return $q.reject(rejection);
            }
        };
    });

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider', '$httpProvider',
        'jwtInterceptorProvider', 'jwtOptionsProvider', '$qProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper, $httpProvider,
                          jwtInterceptorProvider, jwtOptionsProvider, $qProvider) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode({
            enabled: false,
        });
        $qProvider.errorOnUnhandledRejections(false); // Desabilitar el mensaje Possibly unhandled rejection:
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        jwtOptionsProvider.config({
            whiteListedDomains: [
                'web.prointelsi.com',
                'prointelsi.com',
                'gesdoc.api.prointelsi.com',
                'http://www.gesdoc.api.prointelsi.com',
                'http://localhost',
                'http://localhost:3010',
                'http://api2.gesdoc.local',
                'api.gesdoc.local',
                'apigesdoc.putumayo.gov.co',
                'api2.gesdoc.local',

                'apilvgesdoc.putumayo.gov.co',
            ],
            authHeader: 'Jwt'
        });
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
        //$httpProvider.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
        //$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';

        //$httpProvider.defaults.headers.get['Content-Type'] = 'application/json';

        $httpProvider.interceptors.push('ManejoErrorsHttp');

        //en cada petición enviamos el token a través de los headers con el nombre Authorization
        jwtInterceptorProvider.tokenGetter = function ($localStorage) {
            return $localStorage.kt;
        };

        $httpProvider.interceptors.push('jwtInterceptor');
        jwtInterceptorProvider.forceHeadersUpdate = true;
        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');

        // Application Routes
        // -----------------------------------
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
        .state('app.radica-salida', {
            url: '/rad_salida',
            title: 'Radicar salida',
            templateUrl: helper.basepath('radicacion/frm_radicar_salida.html'),
            controller: 'SalidaController',
            resolve: helper.resolveFor('inputmask', 'moment', 'ui.select', 'qrcode', 'moment-business', 'print-area'),
        })
        .state('app.radica-interna', {
            url: '/singleview',
            title: 'Single View',
            templateUrl: RUTA_ABS + 'dashboard/ds_admin',
        })

        .state('app.radica-admin', {
            url: '/radicacion',
            title: 'Administrar radicados',
            templateUrl: helper.basepath('radicacion/administrar.html'),
            controller: 'AdminRadicados',
            controllerAs: 'ctAdmRad', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('moment', 'ui.select', 'qrcode', 'angularFileUpload', 'filestyle', 'print-area'),
        })
        .state('app.radicado', {
            url: '/radicado/view/:codigoRad',
            params: {
                codigoRad: {
                    value: null,
                    squash: true
                }
            },
            title: 'Ver radicado',
            templateUrl: helper.basepath('radicacion/view_radicado.html'),
            controller: 'viewRadicado',
            controllerAs: 'viewRad', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('moment'),
        })
        .state('app.pq-impresos', {
            url: '/paquetes-impresos',
            title: 'Administrar paquetes impresos de radicación ,',
            templateUrl: helper.basepath('radicacion/admin_paquetes_impresos.html'),
            controller: 'AdminPqImpresos',
            controllerAs: 'ctPq', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('moment', 'ui.select'),
            params: {
                origen: {
                    value: 'GESTION',
                    squash: false
                }
            },
        })
        .state('app.rep-entidad', {
            url: '/repxentidad',
            title: 'Reporte por entidad',
            templateUrl: helper.basepath('reportes/rep_gral_list.html'),
            controller: 'repListGral',
            controllerAs: 'replist', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('inputmask', 'moment', 'ui.select', 'qrcode', 'moment-business', 'print-area'),

        })
        .state('app.rep-consolidados', {
            url: '/repconsolidados',
            title: 'Reporte consolidados',
            templateUrl: helper.basepath('reportes/rep-consolidados.html'),
            controller: 'repConsolidados',
            controllerAs: 'repConsolidados', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('inputmask', 'moment', 'ui.select', 'angularFileSaver'),

        })
        .state('app.rep-indicadores', {
            url: '/repIndicadores',
            title: 'Reporte para indicadores',
            templateUrl: helper.basepath('reportes/rep_indicadores.html'),
            controller: 'repInidicadores',
            controllerAs: 'repI', //se requiere para usar ui-select con ng-model
            resolve: helper.resolveFor('inputmask', 'moment', 'ui.select', 'qrcode', 'moment-business', 'print-area'),

        })
        .state('app.usuarios', {
            url: '/usuarios',
            title: 'Usuarios',
            templateUrl: helper.basepath('administracion/usuarios/inicio.html'),
            controller: 'UsuariosController',
            resolve: helper.resolveFor('ui.select')
        })
        .state('app.sgd-gestion', {
            url: '/gestion',
            title: 'Gestión documental',
            templateUrl: helper.basepath('gestion_documental/inicio_gestion_doc.html'),
            controller: 'GestionController',
            controllerAs: 'GesDoc',
            resolve: helper.resolveFor('moment', 'ui.select', 'qrcode', 'print-area'),
        })

        .state('app.ges_documento', {
            url: '/gestion/:codigoRad',
            abstract: true,
            title: 'Gestión documento',
            templateUrl: helper.basepath('gestion_documental/gestion_documento.html'),
            resolve: {
                data: function ($rootScope, GestionDocumental, $stateParams) {
                    return GestionDocumental.fnGetDocumento($stateParams.codigoRad).then(function (dts) {
                        $rootScope.$storage.setItem('gesdDoc', angular.toJson(dts.data));
                    })
                }
            }
        })
        .state('app.ges_documento.tabInfo', {
            url: '/tbinicio',
            title: 'Gestión documento',
            controller: 'viewDocumento',
            controllerAs: 'viewRad',
            params: {
                tab: {
                    value: 'tabinfo',
                    squash: false
                }
            },
            templateUrl: helper.basepath('gestion_documental/view_documento.html'),
        })
        .state('app.ges_documento.tabAsigna', {
            url: '/tbasigna',
            title: 'Asignación - Gestión documento',
            controller: 'asignaController',
            controllerAs: '$ctrAsig',
            params: {
                tab: {
                    value: 'tabasignacion',
                    squash: false
                }
            },
            templateUrl: helper.basepath('gestion_documental/asignacion/frm_asignacion.html'),
            resolve: helper.resolveFor('slimscroll'),

        })
        .state('app.ges_documento.tabSeguimiento', {
            url: '/tbseguimiento',
            title: 'Anexos - Gestión documento',
            controller: 'SeguimientoController',
            controllerAs: 'ctrseg',
            params: {
                tab: {
                    value: 'tabsegmiento',
                    squash: false
                }
            },
            templateUrl: helper.basepath('gestion_documental/seguimiento/frm_seguimiento.html'),
            resolve: helper.resolveFor('moment', 'ng-file-upload', 'filestyle', 'inputmask', 'slimscroll'),
        })
        .state('app.ges_documento.tabAnexos', {
            url: '/tbanexos',
            title: 'Anexos - Gestión documento',
            controller: 'AnexosController',
            controllerAs: 'CtrlAnexos',
            params: {
                tab: {
                    value: 'tabanexos',
                    squash: false
                }
            },
            templateUrl: helper.basepath('gestion_documental/anexos_doc/inicio_anexos.html'),
            resolve: helper.resolveFor('moment', 'ng-file-upload', 'filestyle', 'inputmask'),
        })
        .state('app.ges_documento.tabHistorial', {
            url: '/tbHistoria',
            title: 'Historial documento',
            controller: 'HistorialController',
            controllerAs: 'CtrlHistoria',
            params: {
                tab: {
                    value: 'tabhistorial',
                    squash: false
                }
            },
            templateUrl: helper.basepath('gestion_documental/tab_historial_doc.html'),
            resolve: helper.resolveFor('moment', 'ng-file-upload', 'filestyle', 'inputmask'),
        })

        .state('app.ges_documento.tabRestringed', {
            url: '/tbrestringido',
            title: 'Gestión documento',
            templateUrl: helper.basepath('acceso_restringido.html'),
            params: {
                tab: {
                    value: 'restinged',
                    squash: false
                }
            },
        })

        .state('app.roles', {
            url: '/roles',
            title: 'roles',
            templateUrl: helper.basepath('administracion/roles/inicio.html'),
            controller: 'RolesController'
        })

        .state('app.submenu', {
            url: '/submenu',
            title: 'Submenu',
            templateUrl: helper.basepath('submenu.html')
        })

        // Radicacion por correo electronico
        // -----------------------------------
        .state('app.mailbox', {
            url: '/mailbox',
            title: 'Mailbox',
            //abstract: true,
            templateUrl: helper.basepath('radicacion/correo/mailbox.html'),
            controller: 'MailboxController'
        })
        .state('app.mailbox.folder', {
            url: '/folder/:folder',
            title: 'Mailbox',
            templateUrl: helper.basepath('radicacion/correo/mailbox-inbox.html')
        })
        .state('app.mailbox.view', {
            url: '/{mid:[0-9]{1,4}}',
            title: 'View mail',
            templateUrl: helper.basepath('radicacion/correo/mailbox-view.html'),
            resolve: helper.resolveFor('ngWig')
        })
        .state('app.mailbox.compose', {
            url: '/compose',
            title: 'Mailbox',
            templateUrl: helper.basepath('radicacion/correo/mailbox-compose.html'),
            resolve: helper.resolveFor('ngWig')
        })

        /*
       MODULO TABLAS AUXILIARES
        */
        .state('aux', {
            url: '/aux',
            abstract: true,
            templateUrl: helper.basepath('app.html'),
            resolve: helper.resolveFor('modernizr', 'icons', 'SweetAlert2', 'whirl')
        })
        .state('aux.tipo_expediente', {
            url: '/tipos-expedientes',
            title: 'Tipos expedientes',
            controller: 'TipoExpedientesController',
            templateUrl: helper.basepath('auxiliares/tipos_expedientes/inicio.html'),
        })
        .state('aux.tipoAnexos', {
            url: '/tipos-anexos',
            title: 'Tipos anexos',
            controller: 'TipoAnexosController',
            templateUrl: helper.basepath('auxiliares/tipo_anexos/inicio.html'),
            resolve: helper.resolveFor('loaders.css', 'spinkit')
        })
        .state('aux.naturaleza', {
            url: '/naturaleza-documento',
            title: 'Naturaleza de documento',
            controller: 'NaturalezaDocController',
            templateUrl: helper.basepath('auxiliares/naturaleza_documento/inicio.html'),
        })
        .state('aux.terceros', {
            url: '/terceros',
            title: 'Contactos/Terceros',
            controller: 'TercerosController',
            templateUrl: helper.basepath('auxiliares/terceros/inicio.html'),
            resolve: helper.resolveFor('inputmask', 'moment', 'bs-datetimerpicker', 'ui.select'),
        })
        .state('aux.series_dctales', {
            url: '/series-documental',
            title: 'Series Documental',
            controller: 'SeriesController',
            templateUrl: helper.basepath('auxiliares/series_documental/inicio.html'),
        })
        .state('aux.series_carpetas', {
            url: '/series-carpetas',
            title: 'Series Carpetas de Documentos',
            controller: 'SeriesCarpetasController',
            templateUrl: helper.basepath('auxiliares/series_carpetas/inicio.html'),
        })
        .state('aux.tipo_documento', {
            url: '/tipos-docuemntos',
            title: 'Tipo documentos',
            controller: 'TipoDocumentosController',
            templateUrl: helper.basepath('auxiliares/tipo_documentos/inicio.html'),
        })

        /*----------MODULO REPORTES----------*/

        .state('reporte', {
            url: '/reportes',
            templateUrl: RUTA_ABS + 'app/views/impresion.html',
            resolve: helper.resolveFor('modernizr', 'icons', 'SweetAlert2'),
            abstract: true,
            controller: ['$rootScope', function ($rootScope) {
                $rootScope.app.layout.isBoxed = false;
            }]
        })
        .state('reporte.list-radicados', {
            url: '/list-view/:tipo_rep/:tipo_rad',
            params: {
                tipo_rep: {
                    value: null,
                    squash: true
                }, tipo_rad: {
                    value: null,
                    squash: true
                },
            },
            title: 'Lista de radicados',
            templateUrl: 'app/views/radicacion/reportes/inicio_list_radicados.html',
            controller: 'repRadListadoPrint',
            controllerAs: 'dtsRep'
        })
        .state('reporte.list-radicados-pdf', {
            url: '/list-view-pdf',
            params: { dtsPdf: null },
            title: 'Lista de radicados',
            templateUrl: 'app/views/generales/view_pdf.html',
            controller: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                if ($stateParams.dtsPdf) {
                    var file = new Blob([$stateParams.dtsPdf], { type: 'application/pdf' });
                    var url = URL.createObjectURL(file);
                }
                document.getElementById('visualizador').setAttribute('src', url);
                //document.getElementById('visualizador').setAttribute('src',url);
            }]
        })
        .state('reporte.list-print-gestion', {
            url: '/list-viewGestion/:tipo_rep/:tipo_rad',
            params: {
                tipo_rep: {
                    value: null,
                    squash: true
                }, tipo_rad: {
                    value: null,
                    squash: true
                }, list_rad: {
                    value: null,
                    squash: true
                },
            },
            title: 'Lista de documentos de gestion',
            templateUrl: 'app/views/gestion_documental/reportes/inicio_list_gestion.html',
            controller: 'repGestionListPrint',
            controllerAs: 'dtsRep'
        })

        .state('app.busqueda-avanzada', {
            url: '/busqueda',
            title: 'Lista de busqueda de reportes',
            templateUrl: 'app/views/busqueda_avanzada/busqueda.html',
            controller: 'busquedaAvanzadaController',
            controllerAs: 'busquedaAvanzada'
        })
        /*------------------PAGES-SISTEMA*/
        /* Single Page Routes
         -----------------------------------*/
        .state('page', {
            url: '/page',
            templateUrl: 'app/views/page.html',
            resolve: helper.resolveFor('modernizr', 'icons', 'SweetAlert2'),
            controller: ['$rootScope', function ($rootScope) {
                $rootScope.app.layout.isBoxed = false;
            }]
        })
        .state('page.login', {
            url: '/login',
            title: 'Login',
            templateUrl: 'app/plantillas/login.html',
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

        //
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // -----------------------------------
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    } // routesConfig

})();

