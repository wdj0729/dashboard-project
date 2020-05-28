var container = document.getElementById('donut');
var data = {
    categories: ['Deposit'],
    series: [
        {
            name: '300만원 미만',
            data: 15
        },
        {
            name: '300만원 이상 500만원 미만',
            data: 30
        },
        {
            name: '500만원 이상 1000만원 미만',
            data: 40
        },
        {
            name: '1000만원 이상',
            data: 15
        }
    ]
};
var options = {
    chart: {
        width: 700,
        height: 700,
        title: '서울특별시 보증금 분포율',
        format: function(value, chartType, areaType, valuetype, legendName) {
            if (areaType === 'makingSeriesLabel') { // formatting at series area
                value = value + '%';
            }

            return value;
        }
    },
    series: {
        radiusRange: ['40%', '100%'],
        showLabel: true,
        showLegend: true
    },
    tooltip: {
        suffix: '%'
    },
    legend: {
        visible: false
        //align: 'bottom'
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