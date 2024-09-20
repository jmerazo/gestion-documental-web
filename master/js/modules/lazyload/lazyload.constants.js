(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css'],
                'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'moment': ['vendor/moment/min/moment-with-locales.min.js'],
                'moment-business': [
                    'vendor_js/momentjs/momentjs-business.js'
                ],
                'bs-datetimerpicker': [
                    'vendor/angularjs-bootstrap-datetimepicker/css/datetimepicker.css',
                    'vendor/angularjs-bootstrap-datetimepicker/js/datetimepicker.js',
                    'vendor/angularjs-bootstrap-datetimepicker/js/datetimepicker.templates.js',
                ],
                'SweetAlert2': [
                    "vendor/sweetalert2/dist/sweetalert2.min.css",
                    "vendor/sweetalert2/dist/sweetalert2.min.js",
                    //"vendor/sweetalert2/dist/sweetalert2.all.min.js"
                ],
                'loaders.css': ['vendor/loaders.css/loaders.css'],
                'whirl': ['vendor/whirl/whirl.min.css'],
                'spinkit': ['vendor/spinkit/css/spinkit.css'],
                'qrcode': ['vendor_js/qrcode/jquery-qrcode-0.14.0.min.js'],
                'print-area': ['vendor_js/printArea.js'],
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'ng-file-upload': ['vendor/ng-file-upload/ng-file-upload.min.js'],
                'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
                'chartjs': [
                    'vendor/chart.js/dist/Chart.js',
                   // 'vendor/chartjs-plugin-labels/build/chartjs-plugin-labels.min.js'
                ],
            },
            // Angular based script (use the right module name)
            modules: [
                // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
                {name: 'ngWig', files: ['vendor/ngWig/dist/ng-wig.min.js']},
                {
                    name: 'oitozero.ngSweetAlert',
                    files: ['vendor/sweetalert/dist/sweetalert.css',
                        'vendor/sweetalert/dist/sweetalert.min.js',
                        'vendor/angular-sweetalert/SweetAlert.js']
                },
                {
                    name: 'ui.select', files: ['vendor/angular-ui-select/dist/select.js',
                        'vendor/angular-ui-select/dist/select.css']
                },
                {name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
                {name: 'angularFileSaver', files: ['vendor/angular-file-saver/angular-file-saver.bundle.min.js']},
                {
                    name: 'chart.js', files: [
                        'vendor/angular-chart.js/dist/angular-chart.min.js',
                        'vendor/chartjs-plugin-labels/build/chartjs-plugin-labels.min.js'
                    ],
                }
            ]
        })
    ;

})();
