angular.module('app.core_gd').filter('multiFilter', function () {
    return function (input, keys, query) {
        if (!angular.isDefined(keys) || !angular.isDefined(query)) return input;
        var terms = query.toLowerCase().split(' ');
        var results = [];
        keys = angular.isArray(keys) ? keys : keys.split(' ');

        input.forEach(item => {
            keys.some(key => {
                terms.some(term => {
                    if (item[key].toLowerCase().indexOf(term) !== -1) {
                        results.push(item);
                    }
                });
            });
        });

        return results;
    };
});
