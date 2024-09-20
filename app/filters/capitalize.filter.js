angular.module('app.core_gd').filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.capitalize() : '';
    };
});
