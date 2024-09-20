/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('masked', masked);

    function masked () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            console.log('------****-----')
          var $elem = $(element);
          if($.fn.inputmask)
            $elem.inputmask();
        }
    }

})();
