(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('masked', masked);

    function masked() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element) {
            var $elem = $(element);
            if ($.fn.inputmask) $elem.inputmask();
        }
    }
})();
