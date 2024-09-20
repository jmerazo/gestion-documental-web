/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS', 'GRAL_COLORS'];

    function Colors(APP_COLORS, GRAL_COLORS) {
        this.byName = byName;
        this.colors = colors;
        this.randomColorsHSL = randomColorsHSL /*devuelve un array de colores aleatorios*/;
        this.randomColor=randomHSL/*devuelve un color aleatorio*/;
        this.byPoss = byPos;

        ////////////////

        function byName(name) {
            return (APP_COLORS[name] || '#fff');
        }

        function byPos(pos) {
            return GRAL_COLORS[pos] || GRAL_COLORS[0];
        }

        function colors(nroColors) {
            var colors = [], nColors = 0;
            nroColors = GRAL_COLORS.length < nroColors ? GRAL_COLORS.length : nroColors;

            for (i = 0; i < nroColors; i++) {
                colors.push(GRAL_COLORS[i]);
            }
            for (i = 0; i < nColors; i++) {
                colors.push(randomHSL());
            }
            return colors
        }

        function randomHSL() {
            return "hsl(" + parseInt(256 * Math.random()) + "," +
                "70%," +
                "85%,1)"
        }

        function randomColorsHSL(nColors) {
            var colors = [];
            for (i = 0; i < nColors; i++) {
                colors.push(randomHSL());
            }
            return colors
        }
    }

})();
