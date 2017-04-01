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
$.getJSON(urlPrefix + '/json/analytics.json', function (data) {
    $.getJSON(data.api.url, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '1',
        'period': 'day',
        'date': 'yesterday',
        'format': 'JSON',
        'token_auth': data.api.token
    }, function (data) {
        $('#yesterday-visits').text(data.value);
    });
    $.getJSON(data.api.url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '1',
        'period': 'day',
        'date': 'yesterday',
        'format': 'JSON',
        'token_auth': data.api.token
    }, function (data) {
        $('#yesterday-actions').text(data.value);
    });
});
function updateAnalytics() {
    $.getJSON(urlPrefix + '/json/analytics.json', function (data) {
        $.getJSON(data.api.url, {
            'module': 'API',
            'method': 'VisitsSummary.getVisits',
            'idSite': '1',
            'period': 'day',
            'date': 'today',
            'format': 'JSON',
            'token_auth': data.api.token
        }, function (data) {
            $('#today-visits').text(data.value);
        });
        $.getJSON(data.api.url, {
            'module': 'API',
            'method': 'VisitsSummary.getActions',
            'idSite': '1',
            'period': 'day',
            'date': 'today',
            'format': 'JSON',
            'token_auth': data.api.token
        }, function (data) {
            $('#today-actions').text(data.value);
        });
    });
};
updateAnalytics();
setInterval(function () {
    updateAnalytics();
}, 15000);