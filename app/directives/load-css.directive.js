(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            element.on('click', function(e) {
                if (element.is('a')) e.preventDefault();
                var uri = attrs.loadCss;
                if (uri) {
                    var link = createLink(uri);
                    if (!link) {
                        $.error('Error creating stylesheet link element.');
                    }
                } else {
                    $.error('No stylesheet location defined.');
                }
            });
        }

        function createLink(uri) {
            var linkId = 'autoloaded-stylesheet';
            var oldLink = $('#' + linkId).attr('id', linkId + '-old');
            $('head').append($('<link/>').attr({
                'id': linkId,
                'rel': 'stylesheet',
                'href': uri
            }));
            if (oldLink.length) oldLink.remove();
            return $('#' + linkId);
        }
    }
})();
