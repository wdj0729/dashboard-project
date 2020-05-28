import React, { Component } from 'react';
import tui from 'tui-chart';

class Pies extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        fetch('http://localhost:5000/seoul')
            .then(res => res.json())
            .then(data => console.log(data));
    }
    render() {
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

        tui.registerTheme('myTheme', theme);
        options.theme = 'myTheme';

        tui.pieChart(container, data, options);
        return (
            <div>
                Pies.js를 App.js에 보이도록 이동
            </div>
        );
    }
}
export default Pies;