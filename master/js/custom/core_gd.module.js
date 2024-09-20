(function () {
    'use strict';
    var RUTA_ABSX
    var RUTA_API2
    var RUTA_NOTIFY;
    switch (window.location.host) {
        case 'web.prointelsi.com':
            RUTA_ABSX = 'http://www.gesdoc.api.prointelsi.com/';
            RUTA_NOTIFY = '';
            break;
        case '172.16.1.80':
            RUTA_ABSX = 'http://172.16.1.80/gesdoc/apigd/';
            RUTA_NOTIFY = 'https://gesdoc-ptyo.herokuapp.com';
            RUTA_API2='';
            break;
        case 'gesdoc.putumayo.gov.co':
            RUTA_ABSX = 'http://apigesdoc.putumayo.gov.co/';
            RUTA_API2='http://apilvgesdoc.putumayo.gov.co/api/'
            RUTA_NOTIFY = 'https://gesdoc-ptyo.herokuapp.com';
            break;
        case 'gesdoc.local':
        case 'localhost:3010':
            RUTA_ABSX = 'http://api.gesdoc.local/';
            RUTA_NOTIFY = 'http://localhost:3000';
            RUTA_API2='http://api2.gesdoc.local/api/'
            break;
        default:
            alert('No se encuentra definida una API para este sitio');
            console.error('No se encuentra definida una API para este sitio', window.location.host);
            RUTA_ABSX = null;
    }
    angular
        .module('app.core_gd', [
            'app.auxiliares',
            'app.radicacion',
            'app.usuarios',
            'app.generales',
            'app.gestion',
            'app.dashboard',
            'app.notifications'
        ])
        .constant('API_URL_SERV', RUTA_ABSX)
        .constant('API_URL_SERV2', RUTA_API2)
        .constant('URL_NOTIFICA', RUTA_NOTIFY)
})();
