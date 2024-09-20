(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
            var navbarForm = $(navbarFormSelector);
            navbarForm.toggleClass('open');
            var isOpen = navbarForm.hasClass('open');
            navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
            $(navbarFormSelector)
                .removeClass('open')
                .find('input[type="text"]').blur();
        }
    }
})();
