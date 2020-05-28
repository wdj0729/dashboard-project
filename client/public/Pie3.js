var container = document.getElementById('pie3');
var data = {
            categories: ['Housetype'],
            series: [
                {
                    name: '아파트',
                    data: 40
                },
                {
                    name: '빌라',
                    data: 30
                },
                {
                    name: '단독주택',
                    data: 18
                },
                {
                    name: '원룸',
                    data: 1
                },
                {
                    name: '오피스텔',
                    data: 10
                },
                {
                    name: '기타',
                    data: 1
                },
            ]
        };
var options = {
            chart: {
                width: 700,
                height: 700,
                title: '서울특별시 매물 유형 분포율',
                format: function(value, chartType, areaType, valuetype, legendName) {
                if (areaType === 'makingSeriesLabel') { // formatting at series area
                    value = value + '%';
                }

                return value;
                }
            },
            series: {
                showLegend: true,
                showLabel: true,
                labelAlign: 'center'
            },
            tooltip: {
                suffix: '%'
            },
            legend: {
                visible: false
            }
        };
var theme = {
            series: {
                series: {
                    colors: [
                        
                    ]
                },
                label: {
                    color: '#fff',
                    fontFamily: 'sans-serif'
                }
            }
        };

// For apply theme

tui.chart.registerTheme('myTheme', theme);
options.theme = 'myTheme';

tui.chart.pieChart(container, data, options);