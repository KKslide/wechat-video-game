// var timer = null;
window.tapCount = 0;
/* 视频播放地址 */
var videoInfo = [
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%80%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src1
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%8C%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src2
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%B8%89%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src3
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%9B%9B%E6%AE%B5%E8%A7%86%E9%A2%91.mp4',//src4
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E4%BA%94%E6%AE%B5%E8%A7%86%E9%A2%91-A%E7%BB%A7%E7%BB%AD%E6%8A%A2%E8%BD%A6.mp4',//srcA
    'http://7xn1j7.media1.z0.glb.clouddn.com/%E7%AC%AC%E5%85%AD%E6%AE%B5%E8%A7%86%E9%A2%91-B%E6%89%BE%E6%8E%A9%E4%BD%93.mp4'//srcB
];

$('.startBtn').on('tap', function () {
    $(this).parent().addClass('hide');
    var myVideo = new video({ 'src': videoInfo[0] });
    // myVideo.listenTime({
    //     // time: 17.04,
    //     // delay: 2
    // });
})

$(".tap-circle").on("touchstart", function () {
    $(this).addClass("biu");
})
$(".tap-circle").on("touchend", function () {
    $(this).removeClass("biu");
    tapCount++;
})