function changeOrientation($print) {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    if (width < height) {
        console.log(width + " " + height);
        $print.width(height);
        $print.height(width);
        // $print.css('top', (height - width) / 2);
        $print.css('top', (height - width) / 2);
        $print.css('left', 0 - (height - width) / 2);
        $print.css('transform', 'rotate(90deg)');
        $print.css('transform-origin', '50% 50%');
        $("#video").css('width', height);
        $("#video").css('height', width);
    } else {
        $print.width(width);
        $print.height(height);
        $print.css('top', 0);
        $print.css('left', 0);
        $print.css('transform', 'none');
        $print.css('transform-origin', '50% 50%');
        $("#video").css('width', width);
        $("#video").css('height', height);
    }

    var evt = "onorientationchange" in window ? "orientationchange" : "resize";

    window.addEventListener(evt, function () {
        console.log(evt);
        //alert(evt);
        setTimeout(function () {
            var width = document.documentElement.clientWidth;
            var height = document.documentElement.clientHeight;
            //$print =  $('#print');
            if (width > height) {

                $print.width(width);
                $print.height(height);
                $print.css('top', 0);
                $print.css('left', 0);
                $print.css('transform', 'none');
                $print.css('transform-origin', '50% 50%');
            }
            else {
                $print.width(height);
                $print.height(width);
                $print.css('top', (height - width) / 2);
                $print.css('left', 0 - (height - width) / 2);
                $print.css('transform', 'rotate(90deg)');
                $print.css('transform-origin', '50% 50%');
                // $("#video").css('width', width);
                // $("#video").css('height', height);
            }
            setRem();
        }, 300);

        function setRem() {
            console.log('serRem');
            width = width > height ? width : height;
            var base = 100;
            var designWidth = 1920;
            var FS = width / designWidth * base;
            document.documentElement.style.fontSize = FS + 'px';
        }
    }, false);
}