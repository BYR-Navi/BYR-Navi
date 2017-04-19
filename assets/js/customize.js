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

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?72e6641dc820f9f3787c7d701f0635cf";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

// $.getJSON(analyticsAPI.url, {
//     'module': 'API',
//     'method': 'VisitsSummary.getVisits',
//     'idSite': analyticsAPI.id,
//     'period': 'day',
//     'date': 'yesterday',
//     'format': 'JSON',
//     'token_auth': analyticsAPI.token
// }, function (data) {
//     $('#yesterday-visits').text(data.value);
// });
// $.getJSON(analyticsAPI.url, {
//     'module': 'API',
//     'method': 'VisitsSummary.getActions',
//     'idSite': analyticsAPI.id,
//     'period': 'day',
//     'date': 'yesterday',
//     'format': 'JSON',
//     'token_auth': analyticsAPI.token
// }, function (data) {
//     $('#yesterday-actions').text(data.value);
// });
// function updateAnalytics() {
//     $.getJSON(analyticsAPI.url, {
//         'module': 'API',
//         'method': 'VisitsSummary.getVisits',
//         'idSite': analyticsAPI.id,
//         'period': 'day',
//         'date': 'today',
//         'format': 'JSON',
//         'token_auth': analyticsAPI.token
//     }, function (data) {
//         $('#today-visits').text(data.value);
//     });
//     $.getJSON(analyticsAPI.url, {
//         'module': 'API',
//         'method': 'VisitsSummary.getActions',
//         'idSite': analyticsAPI.id,
//         'period': 'day',
//         'date': 'today',
//         'format': 'JSON',
//         'token_auth': analyticsAPI.token
//     }, function (data) {
//         $('#today-actions').text(data.value);
//     });
// };
// updateAnalytics();
// setInterval(function () {
//     updateAnalytics();
// }, 15000);
