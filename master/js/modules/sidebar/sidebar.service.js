(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http','API_URL_SERV'];
    function SidebarLoader($http,API_URL_SERV) {
        this.getMenu = getMenu;

        function getMenu(onReady, onError) {
          var menuJson = API_URL_SERV+'admin/aut/menu',
              menuURL  = menuJson; // + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };


          $http
            .get(menuURL)
            .then(onReady, onError);
        }
    }
})();