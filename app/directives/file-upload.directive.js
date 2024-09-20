(function () {
    'use strict';

    angular
        .module('app.generales')
        .directive('fileUpload', FileUploadDirective);

    function FileUploadDirective() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // Logic for file upload handling
            }
        };
    }
})();
