var container = document.getElementById('donut');
var data = {
    categories: ['Deposit'],
    series: [
        {
            name: '20만원 미만',
            data: 10
        },
        {
            name: '20만원 이상 40만원 미만',
            data: 10
        },
        {
            name: '40만원 이상 60만원 미만',
            data: 60
        },
        {
            name: '60만원 이상 80만원 미만',
            data: 10
        },
        {
            name: '80만원 이상',
            data: 10
        }
    ]
};
var options = {
    chart: {
        width: 700,
        height: 700,
        title: '서울특별시 월세 분포율',
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