(function () {
    'use strict';

    angular
        .module('app.notifications')
        .constant('PUSHER_KEY_DEV', 'a6841cf684030493c2cb')
        .constant('PUSHER_KEY_PROD', '2f17485a998f4fb4b65b')
        .constant('PUSHER_CLUSTER', 'us2')
        .constant('SERVER_SOCK_DEV', 'http://localhost:8080');
})();
