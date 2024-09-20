angular.module('app.core_gd').directive('filestyle', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var options = element.data();
            element.filestyle(options);
        }
    };
});
