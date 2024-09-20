// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
        'use strict';

        angular.module('app.core_gd')
            .filter('capitalize', function () {
                return function (input) {
                    return (!!input) ? input.capitalize() : '';
                }
            })
            .filter('highlightKeywords', function ($sce) {
                // returns all words in a sentence as an array, ignoring extra whitespace
                var stringToArray = function (input) {
                    if (input) {
                        return input.match(/\S+/g);
                    } else {
                        return [];
                    }
                };

                // returns regex that basically says 'match any word that starts with one of my keywords'
                var getRegexPattern = function (keywordArray) {
                    var pattern = "(^|\\b)(" + keywordArray.join("|") + ")";
                    return new RegExp(pattern, "gi");
                };
                return function (textToHighlight, keywords) {
                    var filteredText = textToHighlight;
                    if (keywords !== "") {
                        var keywordList = stringToArray(keywords);
                        var pattern = getRegexPattern(keywordList);
                        //console.log(pattern);
                        filteredText = textToHighlight.replace(pattern, '<span class="highlighted">$2</span>');
                    }
                    return $sce.trustAsHtml(filteredText);
                };
            })
            .filter('multiFilter', function () {
                return function (input, keys, query) {
                    var results = [];
                    var terms, key, value, x, i, j;
                    if (angular.isDefined(keys) && angular.isDefined(query)) {
                        keys = angular.isArray(keys) ? keys : keys.split(' ');
                        terms = query.toLowerCase().split(' ');
                        for (x = 0; x < input.length; x++) {
                            for (i = 0; i < keys.length; i++) {
                                if (results.indexOf(input[x]) === -1) {
                                    key = keys[i];
                                    for (j = 0; j < terms.length; j++) {
                                        value = input[x][key].toString().toLowerCase();
                                        if (value.indexOf(terms[j]) !== -1) {
                                            results.push(input[x]);
                                        }
                                    }
                                }
                            }
                        }
                        return results;
                    } else {
                        return input;
                    }
                };
            })
            .filter('orderObjectBy', function () {
                return function (input, attribute) {
                    if (!angular.isObject(input)) return input;

                    var array = [];
                    for (var objectKey in input) {
                        console.log(objectKey);
                        array.push(input[objectKey]);
                    }

                    array.sort(function (a, b) {
                        a = parseInt(a[attribute]);
                        b = parseInt(b[attribute]);
                        return a - b;
                    });
                    return array;
                }
            })
            .filter('cortarTexto', function () {
                return function (input, limit) {
                    if (input) {
                        return (input.length > limit) ? input.substr(0, limit) + '...' : input;
                    } else {
                        return '';
                    }
                };
            })
            .directive('filestyle', function () {
                var directive = {
                    link: link,
                    restrict: 'A'
                };
                return directive;

                function link(scope, element) {
                    var options = element.data();

                    // old usage support
                    options.classInput = element.data('classinput') || options.classInput;

                    element.filestyle(options);
                }
            })
            .directive('img', function () {
                var errorSrc = {
                    link: function postLink(scope, iElement, iAttrs) {
                        iElement.bind('error', function () {
                            angular.element(this).attr("src", iAttrs.errorSrc || "/app/img/team1.jpg");
                        });
                    }
                }
                return errorSrc;
            })
    }
)();
