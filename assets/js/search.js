// search.js

var service = $.url('?service');
var query = $.url('?query');
var nextUrl = $.url('?next');
if (nextUrl) {
    $('#next-url').text('正在跳转到页面').append($('<a>').addClass('sub header').attr('href', nextUrl).text(`${service}：${query}`));
    window.location.replace(nextUrl);
};
