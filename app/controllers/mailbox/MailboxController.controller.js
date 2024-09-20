(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailboxController', MailboxController);

    function MailboxController() {
        var vm = this;

        activate();

        function activate() {
          vm.folders = [
            {name: 'Entrada', folder: 'inbox', alert: 42, icon: 'fa-inbox' }
          ];

          vm.labels = [
            {name: 'Red', color: 'danger'},
            {name: 'Pink', color: 'pink'},
            {name: 'Blue', color: 'info'},
            {name: 'Yellow', color: 'warning'}
          ];

          vm.mail = {
            cc: false,
            bcc: false
          };

          vm.content = '<p>Type something..</p>';
        }
    }
})();
