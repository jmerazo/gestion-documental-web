(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element) {
            if (Browser.msie) {
                element.addClass('hide');
            } else {
                element.on('click', function(e) {
                    e.preventDefault();
                    if (screenfull.enabled) {
                        screenfull.toggle();
                        if (screenfull.isFullscreen)
                            $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                        else
                            $(this).children('em').removeClass('fa-compress').addClass('fa-expand');
                    } else {
                        $.error('Fullscreen not enabled');
                    }
                });
            }
        }
    }
})();
