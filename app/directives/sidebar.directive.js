(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
        };
        return directive;

        function link(scope, element, attrs) {
          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;
          var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
          var subNav = $();

          $sidebar.on(eventName, '.nav > li', function() {
            if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
              subNav.trigger('mouseleave');
              subNav = toggleMenuItem($(this), $sidebar);
              sidebarAddBackdrop();
            }
          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          $win.on('resize.sidebar', function() {
            if (!Utils.isMobile()) asideToggleOff();
          });

          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            asideToggleOff();
            $rootScope.$broadcast('closeSidebarMenu');
          });

          if (angular.isDefined(attrs.sidebarAnyclickClose)) {
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

            function watchExternalClicks(newVal) {
              if (newVal === true) {
                $timeout(function() {
                  wrapper.on(sbclickEvent, function(e) {
                    if (!$(e.target).parents('.aside').length) {
                      asideToggleOff();
                    }
                  });
                });
              } else {
                wrapper.off(sbclickEvent);
              }
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if (!scope.$$phase) scope.$apply();
          }

          scope.$on('$destroy', function() {
            eventOff1();
            eventOff2();
            if (angular.isFunction(watchOff1)) watchOff1();
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            if (wrapper) wrapper.off(sbclickEvent);
          });

          function sidebarAddBackdrop() {
            var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop' });
            $backdrop.insertAfter('.aside-inner').on('click mouseenter', function() {
              removeFloatingNav();
            });
          }

          function toggleMenuItem($listItem, $sidebar) {
            removeFloatingNav();
            var ul = $listItem.children('ul');
            if (!ul.length) return $();
            if ($listItem.hasClass('open')) {
              toggleTouchItem($listItem);
              return $();
            }

            var $aside = $('.aside');
            var $asideInner = $('.aside-inner');
            var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            var subNav = ul.clone().appendTo($aside);
            toggleTouchItem($listItem);

            var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
            var vwHeight = $win.height();
            subNav.addClass('nav-floating').css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top: itemTop,
              bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

            subNav.on('mouseleave', function() {
              toggleTouchItem($listItem);
              subNav.remove();
            });

            return subNav;
          }

          function removeFloatingNav() {
            $('.dropdown-backdrop').remove();
            $('.sidebar-subnav.nav-floating').remove();
            $('.sidebar li.open').removeClass('open');
          }
        }
    }
})();
