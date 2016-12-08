// customize-home.js

// version
function updateVersion() {
    $.getJSON('https://api.github.com/repos/iROCKBUNNY/BYR-Navi', function(data) {
        $('#stargazer').html('<i class="star icon"></i> ' + data.stargazers_count + ' Stargazers');
        $('#fork').html('<i class="fork icon"></i>' + data.forks_count + ' Forks');
        $('#version').html('<i class="rocket icon"></i> Updated ' + moment(data.updated_at, 'YYYY-MM-DDTh:mm:ssZ').fromNow());
    });
};
updateVersion();
setInterval(updateVersion, 15000);

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
function updateVisit() {
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
        });
    });
};
updateVisit();
setInterval(updateVisit, 15000);

// search
$.getJSON(urlPrefix + '/json/search_service_data.json', function(data) {
    for (var i in data.search_services) {
        $('#search-services').append(
            $('<option>')
                .attr('id', 'search-service-' + i)
                .attr('value', i)
                .attr('data-url', data.search_services[i].url)
                .attr('data-suffix', data.search_services[i].suffix)
                .html(data.search_services[i].name)
        );
    };
    $('#search-services').dropdown();
});

$('#search-button').click(function() {
    var serviceOption = $('#search-services').val();
    var service = $('#search-service-' + serviceOption);
    var query = $('#search-query').val();
    query = encodeURIComponent(query);
    if (query) {
        window.open(service.attr('data-url') + query + service.attr('data-suffix'), '_blank');
    } else {
        $('#search-div').addClass('error');
        $('#search-query').attr('placeholder', '请输入搜索内容');
    };
});

$('#search-query').click(function() {
    $(this).select();
});

$(document)
    .ready(function() {
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
        var serviceOption = $('#search-services').val();
        var service = $('#search-service-' + serviceOption);
        var query = $('#search-query').val();
        query = encodeURIComponent(query);
        if (query) {
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
                .attr('id', 'public-links-' + i)
                .append($('<h3>')
                .addClass('ui header')
                .html(data.public_links[i].category))
        );
        for (var j in data.public_links[i].links) {
            $('#public-links-' + i).append(
                $('<a>')
                    .addClass('ui button')
                    .attr('href', data.public_links[i].links[j].url)
                    .attr('target', '_blank')
                    .html(data.public_links[i].links[j].name)
            );
        };
    };
    for (var i in data.byr_links) {
        $('#byr-links').append(
            $('<div>')
                .addClass('column')
                .attr('id', 'byr-links-' + i)
                .append($('<h3>')
                .addClass('ui header')
                .html(data.byr_links[i].category))
        );
        for (var j in data.byr_links[i].links) {
            $('#byr-links-' + i).append(
                $('<a>')
                    .addClass('ui button')
                    .attr('href', data.byr_links[i].links[j].url)
                    .attr('target', '_blank')
                    .html(data.byr_links[i].links[j].name)
            );
        };
    };
});