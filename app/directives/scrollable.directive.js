(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('scrollable', scrollable);

    function scrollable() {
        return {
            link: link,
            restrict: 'EA'
        };

        function link(scope, element, attrs) {
            var defaultHeight = 250;
            element.slimScroll({
                height: (attrs.height || defaultHeight)
            });
        }
    }
})();
