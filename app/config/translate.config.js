(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig);

    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider) {
      $translateProvider.useStaticFilesLoader({
          prefix: 'app/i18n/',
          suffix: '.json'
      });

      $translateProvider.preferredLanguage('es_CO');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }
})();
