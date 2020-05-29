import React, { Component } from 'react';
import tui from 'tui-chart';

class Columns extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        fetch('')
        .then(res => res.json())
        .then(data => console.log(data))
        var container = document.getElementById('column');
        var data = {
            categories: ['03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020',],
            series: [
                {
                    name: '마포구',
                    data: [0, 350, 200, 200,]
                },
                {
                    name: '강남구',
                    data: [0, 200, 100, 100,]
                },
                {
                    name: '중구',
                    data: [0, 200, 100, 100,]
                },
                {
                    name: '서초구',
                    data: [0, 250, 100, 100,]
                }
            ]
        };
        var options = {
            chart: {
                width: 1160,
                height: 650,
                title: '서울특별시 거주인원 증가추이',
                format: '1,000'
            },
            yAxis: {
                title: '거주인원(명)',
                min: 0,
                max: 500
            },
            xAxis: {
                title: ''
            },
            legend: {
                align: 'bottom'
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
        tui.columnChart(container, data, options);
    }
    render() {
        return (
            <div>
                Column.js를 App.js에 보이도록 이동
            </div>
        );
    }
}
export default Columns;