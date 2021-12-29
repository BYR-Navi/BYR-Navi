---
---

// analytics.js

// date range
var establishedAt = new Date($('meta[name=established_at]').attr('content'));
function siteEstablishedDays() {
    let d = new Date();
    let today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor((today - establishedAt) / 86400000 + 1);
};

// clock
$('#established-at').countdown(establishedAt, {
    elapse: true
}).on('update.countdown', function (event) {
    if (event.elapsed) {
        $(this).html(event.strftime('<div class="ui label"><i class="rocket icon"></i>已上线</div><div class="ui label">%D<div class="detail">天</div></div><div class="ui label">%-H<div class="detail">小时</div></div><div class="ui label">%-M<div class="detail">分</div></div><div class="ui label">%-S<div class="detail">秒</div></div>'));
    };
});

{%- if site.data.analytics.matomo.site_id -%}
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
var totalActionsCountUp = new CountUp('total-actions', 0, 0, 0, 2.5, countUpOptions);
var liveVisitorsCountUp = new CountUp('live-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var todayVisitorsCountUp = new CountUp('today-visitors-stat', 0, 0, 0, 2.5, countUpOptions);
var todayVisitsCountUp = new CountUp('today-visits-stat', 0, 0, 0, 2.5, countUpOptions);
var todayActionsCountUp = new CountUp('today-actions-stat', 0, 0, 0, 2.5, countUpOptions);
$.getJSON('{{ site.data.analytics.matomo.url }}', {
    'module': 'API',
    'method': 'VisitsSummary.getUniqueVisitors',
    'idSite': '{{ site.data.analytics.matomo.site_id }}',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': '{{ site.data.analytics.matomo.token }}'
}, function (data) {
    yesterdayVisitorsCountUp.update(data.value);
});
$.getJSON('{{ site.data.analytics.matomo.url }}', {
    'module': 'API',
    'method': 'VisitsSummary.getVisits',
    'idSite': '{{ site.data.analytics.matomo.site_id }}',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': '{{ site.data.analytics.matomo.token }}'
}, function (data) {
    yesterdayVisitsCountUp.update(data.value);
});
$.getJSON('{{ site.data.analytics.matomo.url }}', {
    'module': 'API',
    'method': 'VisitsSummary.getActions',
    'idSite': '{{ site.data.analytics.matomo.site_id }}',
    'period': 'day',
    'date': 'yesterday',
    'format': 'JSON',
    'token_auth': '{{ site.data.analytics.matomo.token }}'
}, function (data) {
    yesterdayActionsCountUp.update(data.value);
});
function updateVisit() {
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'range',
        'date': `last${siteEstablishedDays()}`,
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
    }, function (data) {
        totalActionsCountUp.update(data.value);
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'Live.getCounters',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'lastMinutes': '30',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
    }, function (data) {
        liveVisitorsCountUp.update(data[0].visitors);
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
    }, function (data) {
        todayVisitorsCountUp.update(data.value);
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
    }, function (data) {
        todayVisitsCountUp.update(data.value);
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
    }, function (data) {
        todayActionsCountUp.update(data.value);
    });
};
updateVisit();
setInterval(function () {
    if (!document.hidden) {
        updateVisit();
    };
}, 60000);

// chart
var visitSummaryChart = echarts.init(document.getElementById('visit-summary'), 'light');
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
function updateVisitSummaryChart() {
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getUniqueVisitors',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getVisits',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
    });
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'last90',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
    });
};
updateVisitSummaryChart();
visitSummaryChart.hideLoading();
setInterval(function () {
    if (!document.hidden) {
        updateVisitSummaryChart();
    };
}, 60000);

var visitHourlyChart = echarts.init(document.getElementById('visit-hourly'), 'light');
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
                return `${params.value[1]} ${params.value[0]}<br>${params.seriesName}: ${params.value[2]}`;
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
            data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
function updateVisitHourlyChart() {
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitTime.getVisitInformationPerServerTime',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': 'last7',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
    });
};
updateVisitHourlyChart();
visitHourlyChart.hideLoading();
setInterval(function () {
    if (!document.hidden) {
        updateVisitHourlyChart();
    };
}, 60000);

var visitMapChart = echarts.init(document.getElementById('visit-map'), 'light');
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
                var value = params.value;
                if (!value) {
                    value = 0;
                };
                return `${params.seriesName}: ${value}`;
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
            calculable: true
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
function updateVisitMapChart() {
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'UserCountry.getCountry',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'month',
        'date': 'today',
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
    });
};
updateVisitMapChart();
setInterval(function () {
    if (!document.hidden) {
        updateVisitMapChart();
    };
}, 60000);

var visitCalendarChart = echarts.init(document.getElementById('visit-calendar'), 'light');
var firstYear = establishedAt.getFullYear();
var maxYear = 2022;
visitCalendarChart.setOption({
    baseOption: {
        title: {
            text: '历年浏览数据',
            left: 'center'
        },
        tooltip: {
            position: 'top',
            formatter: function (p) {
                return `${echarts.format.formatTime('yyyy-MM-dd', p.data[0])} 浏览次数：${p.data[1]}`;
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
            max: 1000,
            calculable: true,
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
        }, {
            range: 2018,
            right: 5,
            top: 420
        }, {
            range: 2019,
            right: 5,
            top: 600
        }, {
            range: 2020,
            right: 5,
            top: 780
        }, {
            range: 2021,
            right: 5,
            top: 960
        }, {
            range: 2022,
            right: 6,
            top: 1140
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
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 2,
            data: []
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 3,
            data: []
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 4,
            data: []
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 5,
            data: []
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 6,
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
            }, {
                orient: 'vertical',
                left: 'center',
                top: 2350
            }, {
                orient: 'vertical',
                left: 'center',
                top: 3480
            }, {
                orient: 'vertical',
                left: 'center',
                top: 4610
            }, {
                orient: 'vertical',
                left: 'center',
                top: 5740
            }, {
                orient: 'vertical',
                left: 'center',
                top: 6870
            }]
        }
    }]
});
function updateVisitCalendarChart() {
    $.getJSON('{{ site.data.analytics.matomo.url }}', {
        'module': 'API',
        'method': 'VisitsSummary.getActions',
        'idSite': '{{ site.data.analytics.matomo.site_id }}',
        'period': 'day',
        'date': `last${siteEstablishedDays()}`,
        'format': 'JSON',
        'token_auth': '{{ site.data.analytics.matomo.token }}'
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
                    echarts.format.formatTime('yyyy-MM-dd', i),
                    data[i]
                ]);
            };
        };
        visitCalendarChart.setOption({
            series: series
        });
    });
};
updateVisitCalendarChart();
setInterval(function () {
    if (!document.hidden) {
        updateVisitCalendarChart();
    };
}, 60000);
{%- endif -%}
