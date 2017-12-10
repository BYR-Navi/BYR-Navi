// hitokoto.js

$.getJSON('http://api.hitokoto.cn/', function (data) {
    $('#hitokoto').attr({
        'href': '//hitokoto.cn?id=' + data.id,
        'target': '_blank'
    }).append(data.hitokoto).append(
        $('<div>').addClass('detail').text(data.from)
    );
});