// customize-analytics.js

// visit
function updateVisit() {
    $.getJSON('https://vps.irockbunny.com/analytics/?callback=?', {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '1',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': 'f415eff9302de22d195d1d87b092c825'
    }, function(data) {
        $('#visit').text('您是今天莅临本站的 ' + data.value + ' 位重要访客之一');
    });
};
updateVisit();
setInterval(updateVisit, 15000);

// chart
var visitSummaryChart = echarts.init(document.getElementById('visit-summary'), 'macarons');
var option = {
    title: {
        text: '访客数据总览（过去90天）',
        right: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        data: ['访客数', '访问次数', '浏览次数'],
        right: 'center',
        top: 30
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 50,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 50,
            end: 100
        }
    ],    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '访客数',
        type: 'bar',
        data: [],
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: '访问次数',
        type: 'bar',
        data: [],
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }, {
        name: '浏览次数',
        type: 'bar',
        data: [],
        animationDelay: function (idx) {
            return idx * 10 + 200;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};
visitSummaryChart.setOption(option);
visitSummaryChart.showLoading();
function updateVisitSummaryChart() {
    $.getJSON('https://vps.irockbunny.com/analytics/?callback=?', {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': 'f415eff9302de22d195d1d87b092c825'
    }, function(data) {
        var dates = [];
        var visitors = [];
        for (var i in data) {
            dates.push(i);
            visitors.push(data[i]);
        };
        visitSummaryChart.setOption({
            xAxis: {
                data: dates
            },
            series: [{
                name: '访客数',
                type: 'bar',
                data: visitors
            }]
        });
    });
    $.getJSON('https://vps.irockbunny.com/analytics/?callback=?', {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': 'f415eff9302de22d195d1d87b092c825'
    }, function(data) {
        var visits = [];
        for (var i in data) {
            visits.push(data[i]);
        };
        visitSummaryChart.setOption({
            series: [{
                name: '访问次数',
                type: 'bar',
                data: visits
            }]
        });
    });
    $.getJSON('https://vps.irockbunny.com/analytics/?callback=?', {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': 'f415eff9302de22d195d1d87b092c825'
    }, function(data) {
        var actions = [];
        for (var i in data) {
            actions.push(data[i]);
        };
        visitSummaryChart.setOption({
            series: [{
                name: '浏览次数',
                type: 'bar',
                data: actions
            }]
        });
    });
};
updateVisitSummaryChart();
visitSummaryChart.hideLoading();
setInterval(updateVisitSummaryChart, 15000);