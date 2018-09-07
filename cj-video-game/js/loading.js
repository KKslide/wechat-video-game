
!function loading() {
    var t_id = setInterval(animate, 20);
    var pos = 0;
    var dir = 2;
    var len = 0;
    function animate() {
        var elem = document.getElementById('progress');
        if (elem != null) {
            if (pos == 0) len += dir;
            if (len > 32 || pos > 79) pos += dir;
            if (pos > 79) len -= dir;
            if (pos > 79 && len == 0) pos = 0;
            elem.style.left = pos + 'px';
            elem.style.width = len + 'px';
        }
    }
    function romoveLoadMsg() {
        this.clearInterval(t_id);
        var targelem = document.getElementById("loader_container");
        targelem.style.display = 'none';
        targelem.style.visibility = 'hidden';

        // *****************************************
        // document.getElementById('loading-mask').parentNode.removeChild(document.getElementById('loading-mask'));
        document.getElementById('loading-mask').style.display = 'none';
        console.log('done!!!');
        var startBox = document.querySelector('.startAnimate');
        if (startBox != null) {
            startBox.classList.add('start');
        }
        // *****************************************
        // changeOrientation($("#print"));
        // *****************************************
    }
    document.onreadystatechange = function () {
        if (document.readyState == "complete") romoveLoadMsg();
    };
}();
