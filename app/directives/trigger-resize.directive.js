(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize($window, $timeout) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attributes) {
            element.on('click', function() {
                $timeout(function() {
                    var evt = document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, $window, 0);
                    $window.dispatchEvent(evt);
                }, attributes.triggerResize || 300);
            });
        }
    }
})();
