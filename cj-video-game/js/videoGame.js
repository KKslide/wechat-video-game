; (function (window, $) {
    /* 视频播放地址 */
    var videoInfo = [
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src1
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src2
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%89%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src3
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src4
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AE%B5%E8%A7%86%E9%A2%91-A%E7%BB%A7%E7%BB%AD%E6%8A%A2%E8%BD%A6.mp4',//srcA
        'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AE%B5%E8%A7%86%E9%A2%91-B%E6%89%BE%E6%8E%A9%E4%BD%93.mp4'//srcB
    ];
    // var ua = function () {
    //     var u = navigator.userAgent, app = navigator.appVersion;
    //     return {
    //         mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    //         ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //         android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    //         weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
    //         qq: u.match(/\sQQ/i) == " qq", //是否QQ
    //         innerqq: u.match(/QQ\//i) == "QQ/", //是否QQ内置
    //         weixinVer: u.match(/tbs\/0([\d]+)/i) ? u.match(/tbs\/0([\d]+)/i)[1] : 0
    //     };
    // }();
    var document = window.document;
    var win_width = document.documentElement.clientWidth;
    var win_height = document.documentElement.clientHeight;
    // var tapCount = 0;
    var timer = null;
    function getStyle(elem, style) {
        var elem = elem;
        // 主流浏览器
        var win = window;
        if (win.getComputedStyle) {
            // 获取 float 属性使用 cssFloat
            // 测试最新版的浏览器，使用 cssFloat 已经获取不到 float 了，直接使用下面的通用语法
            // if(style === "float"){
            // 	return win.getComputedStyle(elem, null).getPropertyValue("cssFloat");
            // }
            return win.getComputedStyle(elem, null).getPropertyValue(style);

            // 不支持 getComputedStyle 
        } else {
            // IE 下获取透明度
            if (style == "opacity") {
                F.getIEOpacity(elem);

                // IE687 下获取浮动使用 styleFloat
            } else if (style == "float") {
                return elem.currentStyle.getAttribute("styleFloat");

                // 未设置元素的高宽，获取的值是 auto
                // 这里要获取精确的 px 值，使用 elem.getBoundingClientRect 进行 hack
                // 跨浏览器的方法 getBoundingClientRect 可以获得元素四个点相对于文档视图左上角的值 top、left、bottom、right ，通过计算就可以容易地获得准确的元素大小
            } else if ((style == "width" || style == "height") && (elem.currentStyle[style] == "auto")) {
                var clientRect = elem.getBoundingClientRect();

                // 加上 px ，转化为标准输出
                return (style == "width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
            } else if (style == "left" || style == "top" || style == "right" || style == "bottom") {
                var clientRect = elem.getBoundingClientRect();
                var parent = elem.parentNode;
                (function getParent(p) {
                    if (p.currentStyle["position"] == "absolute" || p.currentStyle["position"] == "relative") {
                        parent = p;
                    } else if (p.tagName != "body") {
                        getParent(p.parentNode);
                    } else {
                        parent = document.body;
                    }
                })(parent);
                var clientParent = parent.getBoundingClientRect();
                return clientRect[style] - clientParent[style];
            }

            // 其他样式，无需特殊处理
            return elem.currentStyle.getAttribute(F.camelize(style));
        }
    }
    var options = [
        {
            'mission': 1,
            'videoIndex': videoInfo[0],
            // 'time': 17.04,
            'time': 2,
            'hitTime': 5,
            'hitTip': '防御',
            'hitDesc': '狂点防御敌人',
            'delay': 2000,
            'failDesc': 'defense-fail'
        },
        {
            'mission': 2,
            'videoIndex': videoInfo[0],
            // 'time': 32,
            'time': 6,
            'hitTime': 5,
            'hitTip': '点击狙杀',
            'hitDesc': '',
            'delay': 1000,
            'failDesc': 'defense-fail'
        },
        {
            'mission': 3,
            'videoIndex': videoInfo[1],
            'time': 9.09,
            'hitTime': 3,
            'hitTip': '攻击',
            'hitDesc': '狂点攻击敌人',
            'delay': 1800,
            'failDesc': 'attack-fail'
        },
        {
            'mission': 4,
            'videoIndex': videoInfo[1],
            'time': 23.24,
            'hitTime': 3,
            'hitTip': '攻击',
            'hitDesc': '狂点攻击敌人',
            'delay': 1800,
            'failDesc': 'attack-fail'
        },
        {
            'mission': 5,
            'videoIndex': videoInfo[2],
            'time': 10.06,
            'hitTime': 5,
            'hitTip': '反击',
            'hitDesc': '狂点反击敌人',
            'delay': 1800,
            'failDesc': 'hitback-fail'
        },
        {
            'mission': 6,
            'videoIndex': videoInfo[3],
            'time': null,
            'hitTime': null,
            'hitTip': '',
            'hitDesc': '',
            'delay': null,
            'failDesc': ''
        },
        {
            'mission': 7,
            'videoIndex': videoInfo[4],
            'time': 6.04,
            'hitTime': 5,
            'hitTip': '闪避',
            'hitDesc': '狂点闪避子弹',
            'delay': 2200,
            'failDesc': 'hide-fail'
        },
        {
            // 选项A
            'mission': 8,
            'videoIndex': videoInfo[4],
            'time': 17.05,
            'hitTime': 3,
            'hitTip': '撞他',
            'hitDesc': '狂点撞飞敌人',
            'delay': 1500,
            'failDesc': 'hide-fail'
        },
        {
            // 选项B
            'mission': 9,
            'videoIndex': videoInfo[5],
            'time': null,
            'hitTime': null,
            'hitTip': '',
            'hitDesc': '',
            'delay': null,
            'failDesc': ''
        }
    ]
    function video(opt) {
        opt = opt || {};
        this.width = opt.width || win_width;
        this.height = opt.height || win_height;
        this.src = opt.src || videoInfo[0];
        this.init();
    }
    video.prototype.init = function () {
        var videoElement = document.createElement("video");
        var _this = this;
        videoElement.id = "video";
        videoElement.style.objectFit = "cover";
        videoElement.style.zIndex = -1;
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
        // videoElement.setAttribute("x5-video-player-fullscreen", "true");
        videoElement.setAttribute("preload", "auto");
        videoElement.setAttribute("src", this.src);
        // videoElement.setAttribute("controls", '');
        videoElement.setAttribute("poster", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536317092049&di=ebc6700b6f0c2dc51990ecdc4cc54867&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F590bdc942537c.jpg");
        $("#videoBox").append(videoElement);
        videoElement.addEventListener('canplaythrough', function () {
            _this.duration = videoElement.duration;
            // videoElement.play();
        });
        videoElement.addEventListener('play', function () {
            _this.listenTime(options[0]);
        });
        videoElement.addEventListener('ended', function () {
            _this.end();
        })
    }

    // video.prototype.listenTime = function (time, callback) {
    // video.prototype.listenTime = function () {
    //     var _this = this;
    //     var v = document.querySelector("#video");
    //     $(".tap-circle").attr({ 'hitTime': 5, 'hitTip': '防御', 'hitDesc': '狂点防御敌人' });
    //     this.prepared();
    //     var timer = setInterval(() => {
    //         if (v.currentTime > 2) {
    //             clearInterval(timer);
    //             $(".mainBtn").removeClass("hide");
    //             setTimeout(() => {
    //                 $(".mainBtn").addClass("hide");
    //                 // 1.成功了
    //                 if (tapCount >= 5) {
    //                     /* **********↓↓↓这里是要写成递归↓↓↓*********** */
    //                     // var timer = setInterval(() => {
    //                     //     if (v.currentTime > 6) {
    //                     console.log('成功了!!!');
    //                     //     }
    //                     // }, 100)
    //                     /* **********↑↑↑这里是要写成递归↑↑↑*********** */
    //                 }
    //                 // 2.失败了
    //                 else {
    //                     v.pause();
    //                     console.log('失败了!!!');
    //                     // $("#video").fadeOut();
    //                     // $(".massageBG>.fail").removeClass("hide");
    //                 }
    //                 console.log(tapCount);
    //             }, 2000);
    //         } else {
    //             console.log('视频播放中---------', v.currentTime);
    //         }
    //     }, 100)
    // }




    video.prototype.listenTime = function (opt, callback) {
        var _this = this;
        var v = document.querySelector("#video");
        /**
         * time ---> 就是、要搞事情的时间
         * hitTime --->点击按钮次数
         * hitTip ---> 按钮中间文字
         * hitDesc ---> 按钮旁边的文字描述
         * delay ---> 给玩家的操作时间
         */
        $(".tap-circle").attr({ 'hitTime': opt.hitTime, 'hitTip': opt.hitTip, 'hitDesc': opt.hitDesc });
        this.prepared();
        switch (opt.mission) {
            case 1:
                var timer = setInterval(() => {
                    if (v.currentTime > opt.time) {
                        clearInterval(timer);
                        // $(".mainBtn").removeClass("hide");
                        $(".mainBtn").show();
                        v.pause();
                        return;
                        setTimeout(() => {
                            $(".mainBtn").addClass("hide");
                            // 1.成功了
                            if (tapCount >= opt.hitTime) {
                                /* **********↓↓↓这里是要写成递归↓↓↓*********** */
                                console.log('成功了!!!');
                                _this.listenTime(options[1]);
                                /* **********↑↑↑这里是要写成递归↑↑↑*********** */
                            }
                            // 2.失败了
                            else {
                                v.pause();
                                setTimeout(() => {
                                    for (let i = 0; i < options.length; i++) {
                                        if (opt.videoIndex === options[i].videoIndex) {
                                            $("#video").fadeOut();
                                            $(".failTip").css('background-image', 'url(../img/' + options[i].failDesc + '.png)');
                                            $(".massageBG>.fail").removeClass("hide");
                                        }
                                    }
                                    console.log('失败了!!!');
                                }, 500);
                            }
                            // callback && callback();
                            console.log('--------点击按钮数', tapCount);
                        }, opt.delay);
                    } else {
                        console.log('视频播放中---------', v.currentTime);
                    }
                }, 100)
                break;
            case 2:
                alert('就是这样啦!!!!');
                break;
        }
    }





    video.prototype.prepared = function () {
        tapCount = 0;
        $(".tap-engery").remove();
        var hitTime = $(".tap-circle").attr('hitTime');
        var srcStr = "./img/" + hitTime + "tap-0.png";
        var hitTip = $(".tap-circle").attr('hitTip');
        var hitDesc = $(".tap-circle").attr('hitDesc');
        var bottomImg = document.createElement("img");
        bottomImg.className = "tap-engery";
        bottomImg.id = "bottom-img";
        bottomImg.setAttribute("src", srcStr);
        $(".tap-tip").html(hitTip);
        $(".btnWord").html(hitDesc);
        $(".tap-circle").append(bottomImg);
    }
    // 重置
    video.prototype.reset = function () {

    }
    video.prototype.end = function () {
        console.log('结束了!!!');
    }


    function game(opt) {
        // opt = opt || {};
        // this.time = opt.time || 0;
        // this.word = opt.word || '';
        // this.tapTime = otp.tapTime || 0;
        // this.operation();
    }
    window.video = video;
})(window, Zepto);