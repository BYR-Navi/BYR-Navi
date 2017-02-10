// customize-home.js

// logo spin
$('#logo').hover(function(){
    $(this).addClass('fa-spin text-yellow-inverted');
}, function(){
    $(this).removeClass('fa-spin text-yellow-inverted');
});

// progress bar
$('#page-loading-progress').progress({
    total: 4,
    onSuccess: function() {
        $('#page-loading-progress').fadeOut(1000, function() {
            $('#page-loading-progress').remove();
        });
    }
});

// version
function updateVersion(updateProgressBar) {
    $.getJSON('https://api.github.com/repos/iROCKBUNNY/BYR-Navi', function(data) {
        $('#stargazer').html('<i class="yellow star icon"></i> ' + data.stargazers_count + ' Stargazers');
        $('#fork').html('<i class="orange fork icon"></i>' + data.forks_count + ' Forks');
        $('#version').html('<i class="black rocket icon"></i> Updated ' + moment(data.pushed_at).fromNow());
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
$.getJSON(urlPrefix + '/json/search_service_data.json', function(data) {
    for (var i in data.search_services) {
        $('#search-services').append(
            $('<option>')
                .attr('id', data.search_services[i].id)
                .attr('value', data.search_services[i].id)
                .attr('data-url', data.search_services[i].url)
                .attr('data-suffix', data.search_services[i].suffix)
                .html(data.search_services[i].name)
        );
    };
    $('#search-services').dropdown();
    if (Cookies.get('byr_navi_previous_search_service_option') == undefined || $('#' + Cookies.get('byr_navi_previous_search_service_option')).length === 0) {
        Cookies.set('byr_navi_previous_search_service_option', $('#search-services').val(), { expires: 365 });
    } else {
        $('#search-services').dropdown('set selected', Cookies.get('byr_navi_previous_search_service_option'));
    };
    $('#page-loading-progress').progress('increment');
});

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

// links
$.getJSON(urlPrefix + '/json/link_data.json', function(data) {
    for (var i in data.public_links) {
        $('#public-links').append(
            $('<div>')
                .addClass('column')
                .append(
                    $('<h3>')
                        .addClass('ui header')
                        .text(data.public_links[i].category)
                )
                .append(
                    $('<div>')
                        .attr('id', 'public-links-' + i)
                        .addClass('ui labels')
                )
        );
        for (var j in data.public_links[i].links) {
            $('#public-links-' + i).append(
                $('<a>')
                    .attr('id', 'public-links-' + i + '-' + j)
                    .addClass('ui label')
                    .addClass(data.public_links[i].links[j].style)
                    .attr('href', data.public_links[i].links[j].url)
                    .attr('target', '_blank')
            );
            if (data.public_links[i].links[j].icon !== '') {
                $('#public-links-' + i + '-' + j)
                    .append(
                        $('<i>')
                            .addClass(data.public_links[i].links[j].icon)
                            .addClass('icon')
                    )
                    .append(data.public_links[i].links[j].name)
            } else {
                $('#public-links-' + i + '-' + j).text(data.public_links[i].links[j].name)
            };
        };
    };
    for (var i in data.byr_links) {
        $('#byr-links').append(
            $('<div>')
                .addClass('column')
                .append(
                    $('<h3>')
                        .addClass('ui header')
                        .text(data.byr_links[i].category)
                    )
                .append(
                    $('<div>')
                        .attr('id', 'byr-links-' + i)
                        .addClass('ui labels')
                )
        );
        for (var j in data.byr_links[i].links) {
            $('#byr-links-' + i).append(
                $('<a>')
                    .attr('id', 'byr-links-' + i + '-' + j)
                    .addClass('ui label')
                    .addClass(data.byr_links[i].links[j].style)
                    .attr('href', data.byr_links[i].links[j].url)
                    .attr('target', '_blank')
            );
            if (data.byr_links[i].links[j].icon !== '') {
                $('#byr-links-' + i + '-' + j)
                    .append(
                        $('<i>')
                            .addClass(data.byr_links[i].links[j].icon)
                            .addClass('icon')
                    )
                    .append(data.byr_links[i].links[j].name)
            } else {
                $('#byr-links-' + i + '-' + j).text(data.byr_links[i].links[j].name)
            };
        };
    };
    $('#page-loading-progress').progress('increment');
});