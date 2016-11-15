// customize-home.js

// version
function updateVersion() {
    $.getJSON('https://api.github.com/repos/iROCKBUNNY/BYR-Navi', function(data) {
        $('#stargazer').html('<i class="star icon"></i> ' + data.stargazers_count + ' Stargazers');
        $('#fork').html('<i class="fork icon"></i>' + data.forks_count + ' Forks');
        $('#version').html('<i class="rocket icon"></i> Updated ' + moment(data.pushed_at, 'YYYY-MM-DDTh:mm:ssZ').fromNow());
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
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '1',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        visitCountUp.update(data.value);
    });
};
updateVisit();
setInterval(updateVisit, 15000);

// search
for (var id in searchServices) {
    $('#search-services').append(
        $('<option>')
        .attr('value', id)
        .html(searchServices[id].name)
    );
};

$('#search-services').dropdown();

$('#search-button').click(function() {
    var service = $('#search-services').val();
    var query = $('#search-query').val();
    query = encodeURIComponent(query);
    if (query) {
        window.open(searchServices[service].url + query + searchServices[service].suffix, '_blank');
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
        var service = $('#search-services').val();
        var query = $('#search-query').val();
        query = encodeURIComponent(query);
        if (query) {
            window.open(searchServices[service].url + query + searchServices[service].suffix, '_blank');
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
var count = 0;
for (var pubLinkGroupName in pubLinks) {
    ++count;
    var pubLinksHolderId = 'pub-links-' + count;
    $('#pub-links').append(
        $('<div>').addClass('column')
        .attr('id', pubLinksHolderId)
        .append($('<h3>').addClass('ui header').html(pubLinkGroupName))
    );
    for (var pubLinkName in pubLinks[pubLinkGroupName]) {
        $('#' + pubLinksHolderId).append(
            $('<a>').addClass('ui button')
            .attr('href', pubLinks[pubLinkGroupName][pubLinkName].url)
            .attr('target', '_blank')
            .html(pubLinkName)
        );
    };
};

var count = 0;
for (var byrLinkGroupName in byrLinks) {
    ++count;
    var byrLinksHolderId = 'byr-links-' + count;
    $('#byr-links').append(
        $('<div>').addClass('column')
        .attr('id', byrLinksHolderId)
        .append($('<h3>').addClass('ui header').html(byrLinkGroupName))
    );
    for (var byrLinkName in byrLinks[byrLinkGroupName]) {
        $('#' + byrLinksHolderId).append(
            $('<a>').addClass('ui button')
            .attr('href', byrLinks[byrLinkGroupName][byrLinkName].url)
            .attr('target', '_blank')
            .html(byrLinkName)
        );
    };
};