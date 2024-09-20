(function () {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors', '$localStorage', 'jwtHelper',
        'API_URL_SERV'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, store, jwtHelper, API_URL_SERV) {

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.$URL_API = API_URL_SERV

        $rootScope.$on('tokenHasExpired', function () {
            console.log('Your session has expired!');
        });

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //console.log(authService.getAuthorizationHeader());
            /*console.log('$locationChangeStart - eventd',event)
            console.log('$locationChangeStart - next',next)
            console.log('$locationChangeStart - current',current)*/
            var token = store.kt || null;
            if (token)
                console.log('Expira>> ', jwtHelper.getTokenExpirationDate(token))

            if (!token && next.indexOf('/login') == -1) {
                event.preventDefault()
                $rootScope.$state.go('page.login');
            } else if (token) {
                var bool = jwtHelper.isTokenExpired(token);
                if (bool) {
                    event.preventDefault();
                    delete store.access_token;
                    delete store.refresh_token;
                    delete store.token_type;
                    delete store.expires_in;
                    delete store.kt;

                    $state.go('page.login');
                }
                var infoTk = jwtHelper.decodeToken(token)
                $rootScope.user = infoTk.data;
                if (!$rootScope.socketIdUser) {
                    $rootScope.initSocket(infoTk.data);
                }
            }
        });

        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;
        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function (event, unfoundState/*, fromState, fromParams*/) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                // display new view from topapplication/x-www-form-urlencoded
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
                console.log('$stateChangeSuccess - fromState', fromState);
                /*
                 console.log('$stateChangeSuccess - event', event);
                 console.log('$stateChangeSuccess - toState', toState);
                 console.log('$stateChangeSuccess - toParams', toParams);
                 console.log('$stateChangeSuccess - fromState', fromState);
                 console.log('$stateChangeSuccess - fromParams', fromParams);
                 */
                console.log("Título: ", $rootScope.currTitle)
            });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };
    }

})();

