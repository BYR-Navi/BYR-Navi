// customize-analytics.js

// visit
var countUpOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ''
};
var yesterdayVisitorsCountUp = new CountUp('yesterday-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var yesterdayVisitsCountUp = new CountUp('yesterday-visits-stat', 0, 0, 0, 2.5, countUpOptions);
var yesterdayActionsCountUp = new CountUp('yesterday-actions-stat', 0, 0, 0, 2.5, countUpOptions);
var todayVisitCountUp = new CountUp('visit', 0, 0, 0, 2.5, countUpOptions);
var todayVisitorsCountUp = new CountUp('today-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var todayVisitsCountUp = new CountUp('today-visits-stat', 0, 0, 0, 2.5, countUpOptions);
var todayActionsCountUp = new CountUp('today-actions-stat', 0, 0, 0, 2.5, countUpOptions);
$.getJSON(analyticsAPIurl, {
    'module': 'API',
    'method': 'VisitsSummary.getUniqueVisitors',
    'idSite': '1',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsToken
}, function(data) {
    yesterdayVisitorsCountUp.update(data.value);
});
$.getJSON(analyticsAPIurl, {
    'module': 'API',
    'method': 'VisitsSummary.getVisits',
    'idSite': '1',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsToken
}, function(data) {
    yesterdayVisitsCountUp.update(data.value);
});
$.getJSON(analyticsAPIurl, {
    'module': 'API',
    'method': 'VisitsSummary.getActions',
    'idSite': '1',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsToken
}, function(data) {
    yesterdayActionsCountUp.update(data.value);
});
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
        todayVisitCountUp.update(data.value);
        todayVisitorsCountUp.update(data.value);
    });
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '1',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        todayVisitsCountUp.update(data.value);
    });
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '1',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        todayActionsCountUp.update(data.value);
    });
};
updateVisit();
setInterval(updateVisit, 15000);

// chart
var visitSummaryChart = echarts.init(document.getElementById('visit-summary'), 'macarons');
visitSummaryChart.setOption({
    title: {
        text: '访客数据总览（过去90天）',
        left: 'center'
    },
    legend: {
        data: ['访客数', '访问次数', '浏览次数'],
        right: 'center',
        top: 30
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        showTitle: false,
        feature: {
            restore: {},
            magicType: {
                type: ['bar', 'line']
            },
            dataView: {
                readOnly: true
            },
            saveAsImage: {
                excludeComponents: ['toolbox', 'dataZoom']
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            show: true,
            realtime: true,
            start: 50,
            end: 100
        }
    ],
    xAxis: {
        type : 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
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
});
visitSummaryChart.showLoading();
function updateVisitSummaryChart() {
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        var days = [];
        var visitors = [];
        for (var i in data) {
            days.push(i);
            visitors.push(data[i]);
        };
        visitSummaryChart.setOption({
            xAxis: {
                data: days
            },
            series: [{
                name: '访客数',
                data: visitors
            }]
        });
    });
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        var visits = [];
        for (var i in data) {
            visits.push(data[i]);
        };
        visitSummaryChart.setOption({
            series: [{
                name: '访问次数',
                data: visits
            }]
        });
    });
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '1',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        var actions = [];
        for (var i in data) {
            actions.push(data[i]);
        };
        visitSummaryChart.setOption({
            series: [{
                name: '浏览次数',
                data: actions
            }]
        });
    });
};
updateVisitSummaryChart();
visitSummaryChart.hideLoading();
setInterval(updateVisitSummaryChart, 15000);

var visitHourlyChart = echarts.init(document.getElementById('visit-hourly'), 'macarons');
visitHourlyChart.setOption({
    title: {
        text: '访客数据（7x24小时）',
        left: 'center'
    },
    legend: {
        data: ['访客数', '访问次数', '浏览次数'],
        selectedMode: 'single',
        right: 'center',
        top: 30
    },
    tooltip: {
        position: 'top',
        formatter: function (params) {
            return params.seriesName + ': ' + params.value[2] + ' in ' + params.value[0] + ' of ' + params.value[1];
        }
    },
    toolbox: {
        showTitle: false,
        feature: {
            restore: {},
            saveAsImage: {
                excludeComponents: ['toolbox']
            }
        }
    },
    xAxis: {
        type: 'category',
        data: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
        boundaryGap: false,
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed'
            }
        },
    },
    yAxis: {
        type: 'category',
        data: [],
        splitLine: {
            show: true
        },
        axisLine: {
            show: false
        }
    },
    series: [{
        name: '访客数',
        type: 'scatter',
        data: [],
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    },
    {
        name: '访问次数',
        type: 'scatter',
        data: [],
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    },
    {
        name: '浏览次数',
        type: 'scatter',
        data: [],
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }]
});
visitHourlyChart.showLoading();
function normalizeSymbolSize(val, data) {
    if (val === 0) {
        return 0;
    } else {
        var max = 50;
        var min = 5;
        var data_max = Math.max(...data.map(function(item) {
            return item[2];
        }));
        var data_min = Math.min(...data.map(function(item) {
            return item[2];
        }));
        if (data_max === data_min) {
            return (max - min) / 2 + min;
        } else {
            return (val - data_min) / (data_max - data_min) * (max - min) + min;
        };
    };
};
function updateVisitHourlyChart() {
    $.getJSON(analyticsAPIurl, {
        'module': 'API',
        'method': 'VisitTime.getVisitInformationPerLocalTime',
        'idSite': '1',
        'period': 'day',
        'date': 'last7',
        'format': 'JSON',
        'token_auth': analyticsToken
    }, function(data) {
        var days = [];
        var visitors = [];
        var visits = [];
        var actions = [];
        for (var day in data) {
            days.unshift(day);
            for (var hourNum in data[day]) {
                visitors.push([data[day][hourNum]['label'], day, data[day][hourNum]['nb_uniq_visitors']]);
                visits.push([data[day][hourNum]['label'], day, data[day][hourNum]['nb_visits']]);
                actions.push([data[day][hourNum]['label'], day, data[day][hourNum]['nb_actions']]);
            };
        };
        visitHourlyChart.setOption({
            yAxis: {
                data: days
            },
            series: [{
                name: '访客数',
                data: visitors,
                symbolSize: function (val) {
                    return normalizeSymbolSize(val[2], visitors);
                }
            },
            {
                name: '访问次数',
                data: visits,
                symbolSize: function (val) {
                    return normalizeSymbolSize(val[2], visits);
                }
            },
            {
                name: '浏览次数',
                data: actions,
                symbolSize: function (val) {
                    return normalizeSymbolSize(val[2], actions);
                }
            }]
        });
    });
};
updateVisitHourlyChart();
visitHourlyChart.hideLoading();
setInterval(updateVisitHourlyChart, 15000);