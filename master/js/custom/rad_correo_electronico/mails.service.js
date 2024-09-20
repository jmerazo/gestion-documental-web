// A RESTful factory for retrieving mails from json file

(function () {
    'use strict';

    angular
        .module('app.mailbox')
        .factory('mails', mails);

    mails.$inject = ['$http', '$q', 'API_URL_SERV'];

    function mails($http, $q, API_URL_SERV) {
        var service = {
            all: all,
            get: get
        };
        return service;

        ////////////////

        function readMails() {
            var path = API_URL_SERV + 'radicacion/rad_correos/list_mails';
            var deferred = $q.defer();
            $http.get(path).then(
                function (result) {
                    //console.log(result)
                    deferred.resolve(result.data)
                },
                function (error) {
                    deferred.reject(error)
                }
            );
            return deferred.promise;
        }

        function all() {
            return readMails();
        }

        function get(id) {
            return readMails().then(function (mails) {
                for (var i = 0; i < mails.length; i++) {
                    if (+mails[i].id === +id) return mails[i];
                }
                return null;
            });
        }
    }
})();
