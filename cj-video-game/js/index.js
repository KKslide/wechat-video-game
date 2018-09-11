// var timer = null;
window.tapCount = 0;
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

var myVideo = new video();
$('.startBtn').on('tap', function () {
    $(this).parent().addClass('hide');
    // if (ua.ios) {
        document.querySelector("#video").play();
    // }
    // myVideo.listenTime({
    //     // time: 17.04,
    //     // delay: 2
    // });
})




$(".tap-circle").on("touchstart", function () {
    $(this).addClass("biu");
})
$(".tap-circle").on("touchend", function () {
    var hitTime = $(this).attr("hitTime");
    $(this).removeClass("biu");
    if (tapCount < hitTime) {
        setEnergy(hitTime, tapCount + 1);
    }
    tapCount++;
})

function setEnergy(a, b) {
    var imgElem = document.createElement("img");
    imgElem.className = "tap-engery";
    imgElem.setAttribute("src", "./img/" + a + "tap-" + b + ".png");
    $(".tap-circle").append(imgElem);
}