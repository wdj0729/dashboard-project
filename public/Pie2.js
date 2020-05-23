var container = document.getElementById('pie2');
var data = {
            categories: ['District'],
            series: [
                {
                    name: '강남구',
                    data: 10
                },
                {
                    name: '동작구',
                    data: 10
                },
                {
                    name: '용산구',
                    data: 10
                },
                {
                    name: '은평구',
                    data: 10
                },
                {
                    name: '광진구',
                    data: 10
                },
                {
                    name: '종로구',
                    data: 5
                },
                {
                    name: '송파구',
                    data: 5
                },
                {
                    name: '중구',
                    data: 10
                },
                {
                    name: '마포구',
                    data: 5
                },
                {
                    name: '용산구',
                    data: 5
                },
                {
                    name: '서초구',
                    data: 10
                },
                {
                    name: '관악구',
                    data: 10
                },
            ]
        };
var options = {
            chart: {
                width: 700,
                height: 700,
                title: '서울특별시 자치구별 거주인원 분포율',
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