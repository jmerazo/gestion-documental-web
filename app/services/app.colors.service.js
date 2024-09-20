// modules/app.colors.service.js
(function () {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS', 'GRAL_COLORS'];

    function Colors(APP_COLORS, GRAL_COLORS) {
        this.byName = byName;
        this.colors = colors;
        // otros métodos...
    }
})();