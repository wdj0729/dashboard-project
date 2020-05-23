var container = document.getElementById('pie4');
var data = {
            categories: ['BedCnt'],
            series: [
                {
                    name: '1인실',
                    data: 45
                },
                {
                    name: '2인실',
                    data: 40
                },
                {
                    name: '3인실',
                    data: 10
                },
                {
                    name: '4인실',
                    data: 5
                },
            ]
        };
var options = {
            chart: {
                width: 700,
                height: 700,
                title: '서울특별시 1~4인실 점유율',
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