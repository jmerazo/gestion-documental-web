(function () {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun);

    translateRun.$inject = ['$rootScope', '$translate'];
    function translateRun($rootScope, $translate) {

        $rootScope.language = {
            listIsOpen: false,
            available: {
                'en': 'English',
                'es_CO': 'Español'
            },
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId) {
                $translate.use(localeId);
                $rootScope.language.selected = $rootScope.language.available[localeId];
                $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
            }
        };

        $rootScope.language.init();
        $rootScope.language.set('es_CO');
    }
})();
