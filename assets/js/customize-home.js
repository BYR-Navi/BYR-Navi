// customize-home.js

// logo spin
$('#logo').hover(function(){
    $(this).addClass('fa-spin text-yellow-inverted');
}, function(){
    $(this).removeClass('fa-spin text-yellow-inverted');
});

// progress bar
$('#page-loading-progress').progress({
    total: 2,
    onSuccess: function() {
        $('#page-loading-progress').fadeOut(1000, function() {
            $('#page-loading-progress').remove();
        });
    }
});

// version
function updateVersion(updateProgressBar) {
    $.getJSON('https://api.github.com/repos/iROCKBUNNY/BYR-Navi', function(data) {
        $('#version img').attr('src', 'https://img.shields.io/badge/Updated-' + encodeURIComponent(moment(data.pushed_at).fromNow()) + '-orange.svg');
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVersion(true);
setInterval(function() {
    updateVersion(false);
}, 15000);

// visit
var countUpOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ''
};
var visitCountUp = new CountUp('visit', 0, 0, 0, 2.5, countUpOptions);
function updateVisit(updateProgressBar) {
    $.getJSON(urlPrefix + '/json/analytics_data.json', function(data) {
        $.getJSON(data.analytics.api_url, {
            'module': 'API',
            'method': 'VisitsSummary.getUniqueVisitors',
            'idSite': '1',
            'period': 'day',
            'date': 'today',
            'format': 'JSON',
            'token_auth': data.analytics.token
        }, function(data) {
            visitCountUp.update(data.value);
            if (updateProgressBar) {
                $('#page-loading-progress').progress('increment');
            };
        });
    });
};
updateVisit(true);
setInterval(function() {
    updateVisit(false);
}, 15000);

// search
$('#search-services').dropdown();
if (Cookies.get('byr_navi_previous_search_service_option') == undefined || $('#' + Cookies.get('byr_navi_previous_search_service_option')).length === 0) {
    Cookies.set('byr_navi_previous_search_service_option', $('#search-services').val(), { expires: 365 });
} else {
    $('#search-services').dropdown('set selected', Cookies.get('byr_navi_previous_search_service_option'));
};

$('#search-button').click(function() {
    var service = $('#' + $('#search-services').val());
    var query = $('#search-query').val();
    query = encodeURIComponent(query);
    if (query) {
        Cookies.set('byr_navi_previous_search_service_option', $('#search-services').val(), { expires: 365 });
        window.open(service.attr('data-url') + query + service.attr('data-suffix'), '_blank');
    } else {
        $('#search-div').addClass('error');
        $('#search-query').attr('placeholder', '请输入搜索内容');
    };
});

$('#search-query').click(function() {
    $(this).select();
});

$(document).ready(function() {
    $('#search-query').focus();
});

$(window).keyup(function(event) {
    var windowTop = $(window).scrollTop();
    var windowHeight = $(window).innerHeight();
    var windowBottom = windowTop + windowHeight;
    var searchBoxTop = $('#search-div').offset().top;
    var searchBoxHeight = $('#search-div').innerHeight();
    var searchBoxBottom = searchBoxTop + searchBoxHeight;
    if (event.key == 'Enter' && searchBoxBottom > windowTop && searchBoxTop < windowBottom) {
        var service = $('#' + $('#search-services').val());
        var query = $('#search-query').val();
        query = encodeURIComponent(query);
        if (query) {
            Cookies.set('byr_navi_previous_search_service_option', $('#search-services').val(), { expires: 365 });
            window.open(service.attr('data-url') + query + service.attr('data-suffix'), '_blank');
        } else {
            $('#search-div').addClass('error');
            $('#search-query').attr('placeholder', '请输入搜索内容').focus();
        };
    };
});

$('#search-query').keyup(function(event) {
    if (event.key) {
        if ($('#search-query').val()) {
            $('#search-div').removeClass('error');
            $('#search-query').attr('placeholder', '立即搜索');
        };
    };
});

// query suggestions
var sugParams = {
    "XOffset": -3, //提示框位置横向偏移量,单位px
    "YOffset": -2, //提示框位置纵向偏移量,单位px
    // "width": $('#search-query').innerWidth(), //提示框宽度，单位px
    "fontColor": "rgba(0, 0, 0, 0.87)", //提示框文字颜色
    "fontColorHI": "rgba(0, 0, 0, 0.87)", //提示框高亮选择时文字颜色
    "fontSize": "14px", //文字大小
    "fontFamily": "Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif", //文字字体
    "borderColor": "rgba(34, 36, 38, 0.14902)", //提示框的边框颜色
    "bgcolorHI": "rgba(0, 0, 0, 0.05)", //提示框高亮选择的颜色
    "sugSubmit": false //选中提示框中词条时是否提交表单
};
BaiduSuggestion.bind('search-query', sugParams);