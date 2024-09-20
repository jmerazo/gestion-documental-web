(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {
        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
            support: {
                transition: transitionEndEvent(),
                animation: animationEndEvent(),
                requestAnimationFrame: getRequestAnimationFrame(),
                touch: isTouchSupported(),
                mutationobserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null
            },
            isInView: isInView,
            langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',
            isTouch: isTouchSupported,
            isSidebarCollapsed: isSidebarCollapsed,
            isSidebarToggled: isSidebarToggled,
            isMobile: isMobile
        };

        // Helper function to check if the element is in view
        function isInView(element, options) {
            var $element = $(element);

            if (!$element.is(':visible')) return false;

            var windowLeft = $win.scrollLeft(),
                windowTop  = $win.scrollTop(),
                offset     = $element.offset(),
                left       = offset.left,
                top        = offset.top;

            options = $.extend({topoffset: 0, leftoffset: 0}, options);

            return top + $element.height() >= windowTop && 
                   top - options.topoffset <= windowTop + $win.height() &&
                   left + $element.width() >= windowLeft &&
                   left - options.leftoffset <= windowLeft + $win.width();
        }

        // Helper function to detect transition end event name
        function transitionEndEvent() {
            var element = document.body || document.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };

            for (var name in transEndEventNames) {
                if (element.style[name] !== undefined) {
                    return { end: transEndEventNames[name] };
                }
            }
        }

        // Helper function to detect animation end event name
        function animationEndEvent() {
            var element = document.body || document.documentElement,
                animEndEventNames = {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd oanimationend',
                    animation: 'animationend'
                };

            for (var name in animEndEventNames) {
                if (element.style[name] !== undefined) {
                    return { end: animEndEventNames[name] };
                }
            }
        }

        // Check if requestAnimationFrame is supported
        function getRequestAnimationFrame() {
            return window.requestAnimationFrame || 
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   window.oRequestAnimationFrame ||
                   function(callback) { window.setTimeout(callback, 1000 / 60); };
        }

        // Helper function to detect if touch is supported
        function isTouchSupported() {
            return ('ontouchstart' in window) ||
                   (window.DocumentTouch && document instanceof window.DocumentTouch) ||
                   (navigator.maxTouchPoints > 0) || // IE10+
                   (navigator.msMaxTouchPoints > 0); // IE11+
        }

        // Check if the sidebar is collapsed
        function isSidebarCollapsed() {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
        }

        // Check if the sidebar is toggled
        function isSidebarToggled() {
            return $body.hasClass('aside-toggled');
        }

        // Check if the window is in mobile mode
        function isMobile() {
            return $win.width() < APP_MEDIAQUERY.tablet;
        }
    }
})();