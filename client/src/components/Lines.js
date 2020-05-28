import React, { Component } from 'react';
import tui from 'tui-chart';

class Lines extends Component {
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
        var container = document.getElementById('line');
        var data = {
            categories: ['03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020',],
            series: [
                {
                    name: '전체유형',
                    data: [0, 1000, 1500, 2000,]
                },
                {
                    name: '아파트',
                    data: [0, 400, 600, 800,]
                },
                {
                    name: '빌라',
                    data: [0, 300, 300, 450,]
                },
                {
                    name: '단독주택',
                    data: [0, 180, 270, 360,]
                },
                {
                    name: '원룸',
                    data: [0, 10, 15, 20,]
                },
                {
                    name: '오피스텔',
                    data: [0, 100, 150, 200,]
                },
                {
                    name: '기타',
                    data: [0, 10, 15, 20,]
                }
            ]
        };
        var options = {
            chart: {
                width: 1160,
                height: 540,
                title: '서울특별시 거주 인원 증가 추이',
                format: ',',
            },
            yAxis: {
                title: '거주 인원(명)',
                min: 0,
                max: 2500,
            },
            xAxis: {
                title: '',
                pointOnColumn: true,
                dateFormat: 'MMM',
                tickInterval: 'auto'
            },
            series: {
                showDot: true,
                zoomable: true,
            },
            tooltip: {
                suffix: ''
            },
            legend: {
                align: 'bottom'
            },
            plot: {
                bands: [
                    {
                        range: ['04/01/2020', '05/01/2020'],
                        color: 'gray',
                        opacity: 0.2
                    }
                ],
                lines: [
                    {
                        value: '04/01/2020',
                        color: '#fa2828'
                    }
                ]
            }
        };
        var theme = {
            series:{
                series: {
                    colors: [
                        
                    ]
                    ,
                    label: {
                        color: '#fff',
                        fontFamily: 'sans-serif'
                    }
                }
            }
        };
        // For apply theme
        tui.registerTheme('myTheme', theme);
        options.theme = 'myTheme';
        tui.lineChart(container, data, options);
        return (
            <div>
                Lines.js를 App.js에 보이도록 이동
            </div>
        );
    }
}
export default Lines;