; (function (window, $) {
    var document = window.document;
    var win_width = document.documentElement.clientWidth;
    var win_height = document.documentElement.clientHeight;
    // var tapCount = 0;
    var timer = null;
    function video(opt) {
        opt = opt || {};
        this.width = opt.width || win_width;
        this.height = opt.height || win_height;
        this.src = opt.src || '';
        this.init();
    }
    video.prototype.init = function () {
        var videoElement = document.createElement("video");
        var _this = this;
        videoElement.id = "video";
        videoElement.style.objectFit = "cover";
        videoElement.style.objectFit = "cover";
        if (win_width < win_height) {
            videoElement.style.width = this.height + "px";
            videoElement.style.height = this.width + "px";
        } else {
            videoElement.style.width = this.width + "px";
            videoElement.style.height = this.height + "px";
        }
        videoElement.setAttribute("webkit-playsinline", "true");
        videoElement.setAttribute("x-webkit-airplay", "true");
        videoElement.setAttribute("playsinline", "true");
        videoElement.setAttribute("x5-video-player-type", "h5");
        videoElement.setAttribute("x5-video-orientation", "h5");
        videoElement.setAttribute("x5-video-player-fullscreen", "true");
        videoElement.setAttribute("preload", "auto");
        videoElement.setAttribute("src", this.src);
        videoElement.setAttribute("controls", '');
        videoElement.setAttribute("poster", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536317092049&di=ebc6700b6f0c2dc51990ecdc4cc54867&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F590bdc942537c.jpg");
        $("#orientationContainer").append(videoElement);
        videoElement.addEventListener('canplaythrough', function () {
            _this.duration = videoElement.duration;
            videoElement.play();
        });
        videoElement.addEventListener('play', function () {
            _this.listenTime();
        });
        videoElement.addEventListener('ended', function () {
            _this.end();
        })
    }

    // video.prototype.listenTime = function (time, callback) {
    video.prototype.listenTime = function () {
        var v = document.querySelector("#video");
        var timer = setInterval(() => {
            if (v.currentTime > 2) {
                clearInterval(timer);
                $(".mainBtn").removeClass("hide");
                setTimeout(() => {
                    console.log(tapCount);
                    $(".mainBtn").addClass("hide");
                }, 2000);
            } else {
                console.log(v.currentTime);
            }
        }, 100)
    }
    video.prototype.end = function () {
        console.log('结束了!!!');
    }
    window.video = video;
})(window, Zepto);