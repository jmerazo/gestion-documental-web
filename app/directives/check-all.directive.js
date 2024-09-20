(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element) {
            element.on('change', function() {
                var index = $(this).index() + 1;
                var checkbox = $(this).find('input[type="checkbox"]');
                var table = $(this).parents('table');
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                    .prop('checked', checkbox[0].checked);
            });
        }
    }
})();
