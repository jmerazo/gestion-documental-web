// modules/app.colors.constants.js
(function () {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
            'primary': '#5d9cec',
            'success': '#27c24c',
            // otros colores...
        })
        .constant('GRAL_COLORS', [
            '#058DC7', '#50B432', '#ED561B', '#DDDF00', 
            // otros colores...
        ]);
})();
