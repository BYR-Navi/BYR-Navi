// customize-analytics.js

// date range
var firstDay = new Date(2016, 9, 1);
function siteSinceDays() {
    var d = new Date();
    var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor((today - firstDay) / 86400000 + 1);
};

// progress bar
$('#page-loading-progress').progress({
    total: 13,
    onSuccess: function () {
        $('#page-loading-progress').fadeOut(1000, function () {
            $('#page-loading-progress').remove();
        });
    }
});

// visit
var countUpOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ''
};
var siteSinceDaysCountUp = new CountUp('site-since-days', 0, 0, 0, 2.5, countUpOptions);
var yesterdayVisitorsCountUp = new CountUp('yesterday-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var yesterdayVisitsCountUp = new CountUp('yesterday-visits-stat', 0, 0, 0, 2.5, countUpOptions);
var yesterdayActionsCountUp = new CountUp('yesterday-actions-stat', 0, 0, 0, 2.5, countUpOptions);
var totalActionsCountUp = new CountUp('total-actions', 0, 0, 0, 2.5, countUpOptions);
var todayVisitorsCountUp = new CountUp('today-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var todayVisitsCountUp = new CountUp('today-visits-stat', 0, 0, 0, 2.5, countUpOptions);
var todayActionsCountUp = new CountUp('today-actions-stat', 0, 0, 0, 2.5, countUpOptions);
siteSinceDaysCountUp.update(siteSinceDays());
$.getJSON(analyticsAPI.url, {
    'module': 'API',
    'method': 'VisitsSummary.getUniqueVisitors',
    'idSite': analyticsAPI.id,
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsAPI.token
}, function (data) {
    yesterdayVisitorsCountUp.update(data.value);
    $('#page-loading-progress').progress('increment');
});
$.getJSON(analyticsAPI.url, {
    'module': 'API',
    'method': 'VisitsSummary.getVisits',
    'idSite': analyticsAPI.id,
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsAPI.token
}, function (data) {
    yesterdayVisitsCountUp.update(data.value);
    $('#page-loading-progress').progress('increment');
});
$.getJSON(analyticsAPI.url, {
    'module': 'API',
    'method': 'VisitsSummary.getActions',
    'idSite': analyticsAPI.id,
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': analyticsAPI.token
}, function (data) {
    yesterdayActionsCountUp.update(data.value);
    $('#page-loading-progress').progress('increment');
});
function updateVisit(updateProgressBar) {
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': analyticsAPI.id,
        'period': 'range',
        'date': 'last' + siteSinceDays(),
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        totalActionsCountUp.update(data.value);
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        todayVisitorsCountUp.update(data.value);
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        todayVisitsCountUp.update(data.value);
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        todayActionsCountUp.update(data.value);
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVisit(true);
setInterval(function () {
    updateVisit(false);
}, 15000);

// chart
var visitSummaryChart = echarts.init(document.getElementById('visit-summary'), 'macarons');
visitSummaryChart.setOption({
    baseOption: {
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
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
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
                xAxisIndex: [0],
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
    },
    media: [{
        query: {
            maxWidth: 767
        },
        option: {
            legend: {
                orient: 'vertical'
            },
            grid: {
                top: 110,
                left: 40,
                right: 10
            },
            toolbox: {
                show: false
            }
        }
    }]
});
visitSummaryChart.showLoading();
function updateVisitSummaryChart(updateProgressBar) {
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
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
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
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
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
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
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVisitSummaryChart(true);
visitSummaryChart.hideLoading();
setInterval(function () {
    updateVisitSummaryChart(false);
}, 15000);

var visitHourlyChart = echarts.init(document.getElementById('visit-hourly'), 'macarons');
visitHourlyChart.setOption({
    baseOption: {
        title: {
            text: '访客数据（7×24小时）',
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
                return params.value[1] + ' ' + params.value[0] + '<br />' + params.seriesName + ': ' + params.value[2];
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
    },
    media: [{
        query: {
            maxWidth: 767
        },
        option: {
            legend: {
                orient: 'vertical'
            },
            grid: {
                top: 110,
                left: 70,
                right: 10
            },
            toolbox: {
                show: false
            }
        }
    }]
});
visitHourlyChart.showLoading();
function normalizeSymbolSize(val, data, resize) {
    if (val === 0) {
        return 0;
    } else {
        if (resize) {
            var max = 20;
            var min = 5;
        } else {
            var max = 40;
            var min = 10;
        };
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
function updateVisitHourlyChart(updateProgressBar) {
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitTime.getVisitInformationPerServerTime',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'last7',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
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
            baseOption: {
                yAxis: {
                    data: days
                },
                series: [{
                    name: '访客数',
                    data: visitors,
                    symbolSize: function (val) {
                        return normalizeSymbolSize(val[2], visitors, false);
                    }
                },
                {
                    name: '访问次数',
                    data: visits,
                    symbolSize: function (val) {
                        return normalizeSymbolSize(val[2], visits, false);
                    }
                },
                {
                    name: '浏览次数',
                    data: actions,
                    symbolSize: function (val) {
                        return normalizeSymbolSize(val[2], actions, false);
                    }
                }]
            },
            media: [{
                query: {
                    maxWidth: 767
                },
                option: {
                    series: [{
                        name: '访客数',
                        data: visitors,
                        symbolSize: function (val) {
                            return normalizeSymbolSize(val[2], visitors, true);
                        }
                    },
                    {
                        name: '访问次数',
                        data: visits,
                        symbolSize: function (val) {
                            return normalizeSymbolSize(val[2], visits, true);
                        }
                    },
                    {
                        name: '浏览次数',
                        data: actions,
                        symbolSize: function (val) {
                            return normalizeSymbolSize(val[2], actions, true);
                        }
                    }]
                }
            }]
        });
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVisitHourlyChart(true);
visitHourlyChart.hideLoading();
setInterval(function () {
    updateVisitHourlyChart(false);
}, 15000);

var visitMapChart = echarts.init(document.getElementById('visit-map'), 'macarons');
visitMapChart.setOption({
    baseOption: {
        title: {
            text: '本月访客来源',
            left: 'center'
        },
        legend: {
            data: ['访客数', '访问次数', '浏览次数'],
            selectedMode: 'single',
            right: 'center',
            top: 30
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var value = params.value
                if (!value) {
                    value = 0
                };
                return params.name + ': ' + value;
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
        visualMap: {
            min: 0,
            max: 5000,
            text:['High','Low'],
            calculable: true,
            inRange: {
                color: ['#F6EFA6', '#D88273', '#BF444C']
            }
        },
        series: [{
            name: '访客数',
            type: 'map',
            mapType: 'world',
            showLegendSymbol: false,
            itemStyle: {
                emphasis: {
                    label: {
                        show:true
                    }
                }
            },
            data:[]
        },
        {
            name: '访问次数',
            type: 'map',
            mapType: 'world',
            showLegendSymbol: false,
            itemStyle: {
                emphasis: {
                    label: {
                        show:true
                    }
                }
            },
            data:[]
        },
        {
            name: '浏览次数',
            type: 'map',
            mapType: 'world',
            showLegendSymbol: false,
            itemStyle: {
                emphasis: {
                    label: {
                        show:true
                    }
                }
            },
            data:[]
        }]
    },
    media: [{
        query: {
            maxWidth: 767
        },
        option: {
            legend: {
                orient: 'vertical'
            },
            toolbox: {
                show: false
            }
        }
    }]
});
function updateVisitMapChart(updateProgressBar) {
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'UserCountry.getCountry',
        'idSite': analyticsAPI.id,
        'period': 'month',
        'date': 'today',
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        var visitors = [];
        var visits = [];
        var actions = [];
        var visitorsChina = 0;
        var visitsChina = 0;
        var actionsChina = 0;
        for (var i in data) {
            if (data[i]['label'] == 'China') {
                var visitorsChina = visitorsChina + data[i]['sum_daily_nb_uniq_visitors'];
                var visitsChina = visitsChina + data[i]['nb_visits'];
                var actionsChina = actionsChina + data[i]['nb_actions'];
            } else if (data[i]['label'] == 'Hong Kong SAR China') {
                var visitorsChina = visitorsChina + data[i]['sum_daily_nb_uniq_visitors'];
                var visitsChina = visitsChina + data[i]['nb_visits'];
                var actionsChina = actionsChina + data[i]['nb_actions'];
            } else if (data[i]['label'] == 'Taiwan') {
                var visitorsChina = visitorsChina + data[i]['sum_daily_nb_uniq_visitors'];
                var visitsChina = visitsChina + data[i]['nb_visits'];
                var actionsChina = actionsChina + data[i]['nb_actions'];
            } else if (data[i]['label'] == 'Unknown') {
                var visitorsChina = visitorsChina + data[i]['sum_daily_nb_uniq_visitors'];
                var visitsChina = visitsChina + data[i]['nb_visits'];
                var actionsChina = actionsChina + data[i]['nb_actions'];
            } else {
                visitors.push({
                    'name': data[i]['label'],
                    'value': data[i]['sum_daily_nb_uniq_visitors']
                });
                visits.push({
                    'name': data[i]['label'],
                    'value': data[i]['nb_visits']
                });
                actions.push({
                    'name': data[i]['label'],
                    'value': data[i]['nb_actions']
                });
            };
        };
        visitors.push({
            'name': 'China',
            'value': visitorsChina
        });
        visits.push({
            'name': 'China',
            'value': visitsChina
        });
        actions.push({
            'name': 'China',
            'value': actionsChina
        });
        visitMapChart.setOption({
            series: [{
                name: '访客数',
                data: visitors
            },
            {
                name: '访问次数',
                data: visits
            },
            {
                name: '浏览次数',
                data: actions
            }]
        });
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVisitMapChart(true);
setInterval(function () {
    updateVisitMapChart(false);
}, 15000);

var visitCalendarChart = echarts.init(document.getElementById('visit-calendar'), 'macarons');
var firstYear = firstDay.getFullYear();
var maxYear = 2017;
visitCalendarChart.setOption({
    baseOption: {
        title: {
            text: '历年浏览数据',
            left: 'center'
        },
        tooltip: {
            position: 'top',
            formatter: function (p) {
                var format = echarts.format.formatTime('YYYY-MM-DD', p.data[0]);
                return format + ' 浏览次数：' + p.data[1];
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
        visualMap: {
            min: 50,
            max: 1200,
            calculable: true,
            inRange: {
                color: ['#F6EFA6', '#D88273', '#BF444C']
            },
            orient: 'horizontal',
            top: 'top',
            left: 0
        },
        calendar: [{
            range: 2016,
            right: 5
        }, {
            range: 2017,
            right: 5,
            top: 240
        }],
        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: []
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: []
        }]
    },
    media: [{
        query: {
            maxWidth: 767
        },
        option: {
            toolbox: {
                show: false
            },
            visualMap: {
                orient: 'vertical'
            },
            calendar: [{
                orient: 'vertical',
                left: 'center',
                top: 90
            }, {
                orient: 'vertical',
                left: 'center',
                top: 1220
            }]
        }
    }]
});
function updateVisitCalendarChart(updateProgressBar) {
    $.getJSON(analyticsAPI.url, {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': analyticsAPI.id,
        'period': 'day',
        'date': 'last' + siteSinceDays(),
        'format': 'JSON',
        'token_auth': analyticsAPI.token
    }, function (data) {
        var cursorYear = firstYear;
        var series = [{
            calendarIndex: cursorYear - firstYear,
            data: []
        }];
        for (var i in data) {
            if (data[i] !== 0) {
                year = Number(i.slice(0, 4));
                if (year > cursorYear && year <= maxYear) {
                    cursorYear = year;
                    series.push({
                        calendarIndex: cursorYear - firstYear,
                        data: []
                    });
                } else if (year < firstYear || year > maxYear) {
                    continue;
                };
                series[cursorYear - firstYear].data.push([
                    echarts.format.formatTime('YYYY-MM-DD', i),
                    data[i]
                ]);
            };
        };
        visitCalendarChart.setOption({
            series: series
        });
        if (updateProgressBar) {
            $('#page-loading-progress').progress('increment');
        };
    });
};
updateVisitCalendarChart(true);
setInterval(function () {
    updateVisitCalendarChart(false);
}, 15000);