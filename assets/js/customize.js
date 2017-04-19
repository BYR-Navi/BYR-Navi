// customize.js
$(document).ready(function () {
    // fix menu when passed
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('fade out');
        }
    });
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
});
// loading dimmer
$('.loading-trigger').on('click', function () {
    $('#loading-dimmer').dimmer('show');
});
// masthead background
$('.ui.inverted.masthead.segment').addClass('bg' + Math.ceil(Math.random() * 14)).removeClass('zoomed');
// analytics
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?72e6641dc820f9f3787c7d701f0635cf";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
