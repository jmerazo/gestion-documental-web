// modules/app.lazyload.requires.js
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            scripts: {
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                // otros scripts...
            },
            modules: [
                {name: 'ngWig', files: ['vendor/ngWig/dist/ng-wig.min.js']},
                // otros módulos...
            ]
        });
})();
