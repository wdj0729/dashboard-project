var container = document.getElementById('pie');
var data = {
            categories: ['Gender'],
            series: [
                {
                    name: '여성',
                    data: 59.7
                },
                {
                    name: '남성',
                    data: 40.3
                },
            ]
        };
var options = {
            chart: {
                width: 700,
                height: 700,
                title: '서울특별시 성별 거주인원 현황',
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