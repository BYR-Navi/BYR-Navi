// hitokoto.js

$.getJSON('https://v1.hitokoto.cn', function (data) {
    $('#hitokoto').attr({
        'href': `//hitokoto.cn?id=${data.id}`,
        'target': '_blank'
    }).append(data.hitokoto).append(
        $('<div>').addClass('detail').text(data.from)
    );
}).fail(function () {
    $('#hitokoto').attr({
        'href': 'https://www.y-english.org/',
        'target': '_blank'
    }).html('<i class="lightbulb icon"></i>不背单词的GRE工程化解决方案<div class="detail">云英语</div>');
});
