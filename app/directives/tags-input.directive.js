(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('tagsinput', tagsinput);

    tagsinput.$inject = ['$timeout'];
    function tagsinput($timeout) {
        return {
            link: link,
            require: 'ngModel',
            restrict: 'A'
        };

        function link(scope, element, attrs, ngModel) {
            element.on('itemAdded itemRemoved', function() {
                if (ngModel.$viewValue && ngModel.$viewValue.split) {
                    ngModel.$setViewValue(ngModel.$viewValue.split(','));
                    ngModel.$render();
                }
            });

            $timeout(function() {
                element.tagsinput();
            });
        }
    }
})();
