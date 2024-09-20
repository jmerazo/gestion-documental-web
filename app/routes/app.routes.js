// routes/app.routes.js
(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();

// utils/app.utils.js
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
        ]);
})();