(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled($animate) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            scope.$watch(function() {
                return scope.$eval(attrs.animateEnabled, scope);
            }, function(newValue) {
                $animate.enabled(!!newValue, element);
            });
        }
    }
})();
