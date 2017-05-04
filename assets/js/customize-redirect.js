// customize-redirect.js

var service = $.url('?service');
var query = $.url('?query');
var redirectUrl = $.url('?next');
if (redirectUrl) {
    $('#redirect-url').text('正在跳转到页面').append($('<a>').addClass('sub header').attr('href', redirectUrl).text(service + '：' + query));
    window.location.replace(redirectUrl);
};
