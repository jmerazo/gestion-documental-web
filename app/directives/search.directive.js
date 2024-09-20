(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    function searchOpen() {
        return {
            controller: searchOpenController,
            restrict: 'A'
        };
    }

    function searchDismiss() {
        return {
            controller: searchDismissController,
            restrict: 'A'
        };
    }

    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController($scope, $element, NavSearch) {
        $element.on('click', function(e) { e.stopPropagation(); }).on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController($scope, $element, NavSearch) {
        var inputSelector = '.navbar-form input[type="text"]';
        $(inputSelector)
            .on('click', function(e) { e.stopPropagation(); })
            .on('keyup', function(e) {
                if (e.keyCode === 27) {
                    NavSearch.dismiss();
                }
            });

        $(document).on('click', NavSearch.dismiss);
        $element.on('click', function(e) { e.stopPropagation(); }).on('click', NavSearch.dismiss);
    }
})();
