// var timer = null;
window.tapCount = 0;
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
var videoInfo = [
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src1
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src2
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%89%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src3
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src4
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AE%B5%E8%A7%86%E9%A2%91-A%E7%BB%A7%E7%BB%AD%E6%8A%A2%E8%BD%A6.mp4',//srcA
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AE%B5%E8%A7%86%E9%A2%91-B%E6%89%BE%E6%8E%A9%E4%BD%93.mp4'//srcB
];

// var myVideo = new video();
$('.startBtn').on('tap', function () {
    $(this).parent().addClass('hide');
    document.querySelector("#video").play();
});

$(".tap-circle").on("touchstart", function () {
    $(this).addClass("biu");
});

$(".tap-circle").on("touchend", function () {
    var hitTime = $(this).attr("hitTime");
    $(this).removeClass("biu");
    if (tapCount < hitTime) {
        setEnergy(hitTime, tapCount + 1);
    }
    tapCount++;
});

$("#video").on("play", function () {
    gameOptions(2, 2, 5, () => { failOption('defense-fail', '再玩一次') }, function () {
        gameOptions(6, 1, 1, () => { failOption('snipe-fail', '再玩一次') }, () => {
            $("#video").on("ended", function () {
                console.log('狙击成功了');
                $(this).attr('src',videoInfo[1]);
            });
        });
    });
});

// $("#video").on("ended", function () {
//     switch (this.getAttribute('src')) {
//         case videoInfo[0]:
//             console.log('狙击成功了');
//             break;

//         default:
//             break;
//     }
// });

function setEnergy(a, b) {
    var imgElem = document.createElement("img");
    imgElem.className = "tap-engery";
    imgElem.setAttribute("src", "./img/" + a + "tap-" + b + ".png");
    $(".tap-circle").append(imgElem);
}

function snipeTap(qte) {
    tapCount = 1;
    qte.parentNode.removeChild(qte);
}

/**
 * 
 * @param {number} optionTime 操作时间
 * @param {number} duration 操作持续时间
 * @param {tapCount} tapCount 点击数
 * @param {Function} failOption 失败逻辑
 * @param {Function} successOptions 成功逻辑(继续调用还是停止)
 */
function gameOptions(optionTime, duration, tapCount, failOption, successOptions) {
    var _this = document.getElementById("video");
    var timer = setInterval(() => {
        console.log(_this.currentTime);
        if (_this.currentTime >= optionTime) {
            clearInterval(timer);
            // 区分视频一
            if (_this.getAttribute('src') == videoInfo[0] && eval($(".mainBtn").attr('isFirst'))) {
                $("#snipte").removeClass('hide');
                $(".mainBtn").attr('isFirst', false);
            } else {
                $(".mainBtn").show().attr('isFirst', true);
            }
            setTimeout(() => {
                $(".mainBtn").hide();
                tapCount = 0;
                if (tapCount < tapCount) {
                    _this.pause();
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
function failOption(pic, msg) {
    $(".failTip").css('background-image', 'url(./img/' + pic + '.png)')
        .parent().removeClass('hide')
        .siblings("#btn").html(msg).removeClass('hide');
}

// 成功逻辑
function successOptions() {

}