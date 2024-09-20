(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];

    function preloader($animate, $timeout, $q) {
        return {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>',
            link: link
        };

        function link(scope, el) {
            scope.loadCounter = 0;
            var counter = 0, timeout;

            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');

            appReady().then(endCounter);

            timeout = $timeout(startCounter);

            function startCounter() {
                var remaining = 100 - counter;
                counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));
                scope.loadCounter = parseInt(counter, 10);
                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {
                $timeout.cancel(timeout);
                scope.loadCounter = 100;

                $timeout(function() {
                    $animate.addClass(el, 'preloader-hidden');
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var viewsLoaded = 0;
                var off = scope.$on('$viewContentLoaded', function () {
                    viewsLoaded++;
                    if (viewsLoaded === 2) {
                        $timeout(function() {
                            deferred.resolve();
                        }, 3000);
                        off();
                    }
                });
                return deferred.promise;
            }
        }
    }
})();
