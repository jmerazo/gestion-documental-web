(function () {
    'use strict';

    angular
        .module('app.notifications')
        .run(notificationsRun);

    notificationsRun.$inject = ['$rootScope', '$localStorage', '$state', 'URL_NOTIFICA'];

    function notificationsRun($rootScope, $localStorage, $state, URL_NOTIFICA) {

        $rootScope.initSocket = function (data) {
            console.log('llamo a inist:', data);
            try {
                //https://gesdoc-ptyo.herokuapp.com/
                if ($rootScope.socketIdUser) {
                    $rootScope.socket.close();
                }
                $rootScope.socket = io.connect(URL_NOTIFICA, {'forceNew': true});
                $rootScope.socket.on('connect', () => {
                    $rootScope.socketIdUser = $rootScope.socket.id;
                });
                $rootScope.socket.emit('login', data);
                $rootScope.socket.on('new-pqrd-register', listenNewPqrdRegister);

            } catch (e) {
                console.log('Error en el inicio de las notificaciones, ¡Notificaciones desactivadas!', e)
            }
        }

        function listenNewPqrdRegister(data) {
            console.log('xx', data);
            toast('warning', 'Se ha registrado una nueva PQRD')
        }

        /*
                $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
                    if (newValue === false)
                        $rootScope.$broadcast('closeSidebarMenu');
                });
        */
    }

})();
