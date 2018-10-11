var tapCount = 0;
// UA判断
var ua = function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq", //是否QQ
        innerqq: u.match(/QQ\//i) == "QQ/", //是否QQ内置
        weixinVer: u.match(/tbs\/0([\d]+)/i) ? u.match(/tbs\/0([\d]+)/i)[1] : 0
    };
}();
// 视频地址
var videoInfo = [
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src1
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src2
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%89%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src3
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src4
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AE%B5%E8%A7%86%E9%A2%91-A%E7%BB%A7%E7%BB%AD%E6%8A%A2%E8%BD%A6.mp4',//srcA
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AE%B5%E8%A7%86%E9%A2%91-B%E6%89%BE%E6%8E%A9%E4%BD%93.mp4'//srcB
    // './test.mp4',//src1
    // './test2.mp4',//src1
    // './test3.mp4',
    // './test4.mp4',
    // './test5.mp4',
    // './test6.mp4'
];

// 开始游戏
$('.startBtn').on('tap', function () {
    $(this).parent().addClass('hide');
    document.querySelector("#video").play();
});

// 按钮点击动画
$(".tap-circle").on("touchstart", function () {
    $(this).addClass("biu");
});

// 按钮点击动画
$(".tap-circle").on("touchend", function () {
    var hitTime = $(this).attr("hitTime");
    $(this).removeClass("biu");
    if (tapCount < hitTime) {
        setEnergy(hitTime, tapCount + 1);
    }
    tapCount++;
    console.log(tapCount);
});

// 监听视频播放
$("#video").on("play", function () {
    switch ($("#video").attr("src")) {
        // 第一关
        case videoInfo[0]:
            gameOptions(17.04, 2, 5, { 'hittip': '防御', 'hitdesc': '狂点防御敌人' }, () => { failOption('defense-fail') }, () => {
                gameOptions(32.02, 1, 1, {}, () => {
                    // 隐藏狙击十字靶
                    $("#snipte").addClass('hide');
                    failOption('snipe-fail', '再玩一次')
                }, () => {
                    $("#video").on("ended", function () {
                        console.log('狙击成功了');
                        $(this).attr('src', videoInfo[1]);
                        successOptions('success-1', '点击进入下一关');
                    });
                });
            });
            break;

        // 第二关
        case videoInfo[1]:
            gameOptions(9.09, 1.5, 3, { 'hittip': '攻击', 'hitdesc': '狂点攻击敌人' }, () => { failOption('attack-fail') }, () => {
                gameOptions(23.24, 2, 3, { 'hittip': '攻击', 'hitdesc': '狂点攻击敌人' }, () => { failOption('attack-fail') }, () => {
                    $("#video").on("ended", function () {
                        console.log('第二关过了');
                        $(this).attr('src', videoInfo[2]);
                        successOptions('success-1', '点击进入下一关');
                    });
                })
            });
            break;
        // 第三段视频
        case videoInfo[2]:
            gameOptions(10.06, 2, 5, { 'hittip': '反击', 'hitdesc': '狂点反击敌人' }, () => { failOption('hitback-fail') }, () => {
                $("#video").on("ended", function () {
                    console.log('第三关过了');
                    $(this).attr('src', videoInfo[3]);
                    successOptions('success-1', '点击进入下一关');
                });
            })
            break;
        // 第四关
        case videoInfo[3]:
            $("#video").on("ended", function () {
                console.log('已经做出了选择');
                $(".massageBG").css("background-image", "")
                    .find(".success,.optionsBtn").addClass('hide')
                    .siblings('.choice').removeClass('hide');
            });
            break;

        // 第五关-“抢车”选项
        case videoInfo[4]:
            gameOptions(6.06, 2, 5, { 'hittip': '闪避', 'hitdesc': '狂点闪避子弹' }, () => { failOption('hide-fail') }, () => {
                gameOptions(17.05, 2, 3, { 'hittip': '撞他', 'hitdesc': '狂点撞飞敌人' }, () => { failOption('hit-fail') }, () => {
                    $("#video").on("ended", function () {
                        console.log('抢车选项进行完毕');
                        $(".massageBG").css('background-image', 'url(./img/background.jpg)')
                            .find(".choice").addClass('hide')
                            .siblings('.lose').removeClass('hide');
                    });
                })
            })
            break;
        // 第六关-“找掩体”选项
        case videoInfo[5]:
            $("#video").on("ended", function () {
                console.log('第六关结束, 赢了');
                $(".massageBG").css('background-image', 'url(./img/background.jpg)')
                    .find(".choice").addClass('hide')
                    .siblings('.win').removeClass('hide');
            });
            break;
    }
});

// 选项A、B操作
function choice(type) {
    if (type == 'a') {
        // 播放“找掩体”视频
        $("#video").attr('src', videoInfo[4]);
        document.querySelector("#video").play();
    } else if (type == 'b') {
        // 播放“抢车”视频
        $("#video").attr('src', videoInfo[5]);
        document.querySelector("#video").play();
    }
    $('.choice').addClass('hide');
}

// 点击qte按钮操作
function setEnergy(a, b) {
    var imgElem = document.createElement("img");
    imgElem.className = "tap-engery";
    imgElem.setAttribute("src", "./img/" + a + "tap-" + b + ".png");
    $(".tap-circle").append(imgElem);
}

// 十字靶操作
function snipeTap(qte) {
    tapCount = 1;
    qte.classList.add('hide');
}

// 监听视频播放
/**
 * 监听视频播放
 * @param {number} optionTime 操作时间
 * @param {number} duration 操作持续时间
 * @param {tapCount} setTapCount 点击数
 * @param {Object} tapDesc 点击描述
 * @param {Function} failOption 失败逻辑
 * @param {Function} successOptions 成功逻辑(继续调用还是停止)
 */
function gameOptions(optionTime, duration, setTapCount, tapDesc, failOption, successOptions) {
    var _this = document.getElementById("video");
    var timer = setInterval(() => {
        console.log(_this.currentTime);
        if (_this.currentTime >= optionTime) {
            clearInterval(timer);
            // 清空按钮
            $(".tap-circle").empty()
                .attr({
                    'hittime': setTapCount || 5,
                    'hittip': tapDesc.hittip || '攻击',
                    'hitdesc': tapDesc.hitdesc || '狂点攻击敌人'
                })
                .append('<div class="tap-tip">' + $(".tap-circle").attr('hittip') + '</div>')
                .append('<img src="./img/' + setTapCount + 'tap-0.png" class="tap-engery">')
                .siblings(".btnWord").html($(".tap-circle").attr('hitdesc'));
            // 区分视频一
            if (_this.getAttribute('src') == videoInfo[0] && eval($(".mainBtn").attr('isFirst'))) {
                // if (_this.getAttribute('src') == './test.mp4' && eval($(".mainBtn").attr('isFirst'))) {
                $("#snipte").removeClass('hide');
                $(".mainBtn").attr('isFirst', false);
                tapCount = 0;
            } else {
                $(".mainBtn").show().attr('isFirst', true);
                tapCount = 0;
            }
            setTimeout(() => {
                $(".mainBtn").hide();
                if (tapCount < setTapCount) {
                    console.log('点击数量不够用：---', tapCount);
                    _this.pause();
                    console.log();
                    failOption && failOption();
                } else {
                    /* 视频播放结束时??? */
                    successOptions && successOptions();
                }
            }, duration * 1000);
        }
    }, 50);
}

// 失败逻辑
function failOption(pic) {
    setTimeout(() => {
        $(".failTip").css('background-image', 'url(./img/' + pic + '.png)')
            .parent().removeClass('hide')
            .siblings("#btn").html('再试一次').removeClass('hide').data('type', 'again');
    }, 800);
}

// 成功逻辑
function successOptions(pic, msg) {
    $(".massageBG").css("background-image", "url(./img/" + pic + ".jpg)");
    $(".success").removeClass('hide')
        .siblings("#btn").html(msg).removeClass('hide').data('type', 'next');
}

// 成功之后再来一次
function restart(_this) {
    var video = document.getElementById('video');
    video.setAttribute('src', videoInfo[0]);
    video.play();
    _this.parentNode.parentNode.classList.add('hide');
}

// 失败之后再来一次
$(".optionsBtn").on('touchend', function () {
    console.log('button类型---', $(this).data('type'));
    var btnType = $(this).data("type");
    var video = document.getElementById('video');
    switch (btnType) {
        case 'again':
            $(".fail").addClass('hide');
            video.currentTime = 0;
            video.play();
            break;
        case 'next':
            $(".success").addClass('hide');
            video.play();
            break;
    }
    $(".mainBtn").attr("isFirst", false);
    $(".massageBG").css('background-image', '');
    $(this).addClass('hide');
});