(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey($state, $localStorage) {
        return {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };

        function link(scope, element) {
          element.on('click', function(e) {
              e.preventDefault();

              if (scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              } else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }
})();
