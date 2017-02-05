// customize.js

$(document)
    .ready(function() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');

    });

// loading dimmer
$('.loading-trigger')
    .on('click', function() {
        $('#loading-dimmer')
            .dimmer('show');
    });

// copyright
$('#copyright')
    .html(
        function() {
            var date = new Date();
            return '&copy; ' + date.getFullYear() + ' TEELAB';
        }
    );

// feedback
$('.feedback')
    .on('click', function() {
        $('#contacts-dimmer')
            .dimmer('show');
    });

// masthead background
$('.ui.inverted.masthead.segment').addClass('bg' + Math.ceil(Math.random() * 14)).removeClass('zoomed');

// var urlPrefix = 'http://localhost/BYR-Navi';
var urlPrefix = 'http://byr123.irockbunny.com';

// powered by
$.getJSON(urlPrefix + '/json/powered_by_data.json', function(data) {
    for (var i in data.powered_by) {
        $('#powered-by')
            .append(
                $('<a>')
                .addClass('item')
                .attr('href', data.powered_by[i].url)
                .attr('target', '_blank').html(data.powered_by[i].name)
            );
    };
});

// analytics
$.getJSON(urlPrefix + '/json/analytics_data.json', function(data) {
    $.getJSON(data.analytics.api_url, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '1',
        'period': 'day',
        'date': 'yesterday',
        'format': 'JSON',
        'token_auth': data.analytics.token
    }, function(data) {
        $('#yesterday-visits').text(data.value);
    });
    $.getJSON(data.analytics.api_url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '1',
        'period': 'day',
        'date': 'yesterday',
        'format': 'JSON',
        'token_auth': data.analytics.token
    }, function(data) {
        $('#yesterday-actions').text(data.value);
    });
});
function updateAnalytics() {
    $.getJSON(urlPrefix + '/json/analytics_data.json', function(data) {
        $.getJSON(data.analytics.api_url, {
            'module': 'API',
            'method': 'VisitsSummary.getVisits',
            'idSite': '1',
            'period': 'day',
            'date': 'today',
            'format': 'JSON',
            'token_auth': data.analytics.token
        }, function(data) {
            $('#today-visits').text(data.value);
        });
        $.getJSON(data.analytics.api_url, {
            'module': 'API',
            'method': 'VisitsSummary.getActions',
            'idSite': '1',
            'period': 'day',
            'date': 'today',
            'format': 'JSON',
            'token_auth': data.analytics.token
        }, function(data) {
            $('#today-actions').text(data.value);
        });
    });
};
updateAnalytics();
setInterval(function() {
    updateAnalytics();
}, 15000);