//agrego funciones al prototype
if (typeof Array.prototype.findBy !== 'function') {
    Array.prototype.findBy = function (key, value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][key] === value) {
                return i;
            }
        }
        return -1;
    };
}
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

function noCacheView() {
    return '?t=' + $.now();
}

function toast(type, title) {
    swal({
        position: 'top-end',
        type: type,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
    return
}

function verLoading() {
    swal({
        imageUrl: 'app/img/loading.gif',
        width: '200px',
        showConfirmButton: false
    })
}