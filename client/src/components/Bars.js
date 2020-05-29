import React, { Component } from 'react';
import tui from 'tui-chart';

class Bars extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    /*constructor(props) {
        super(props);
    }*/
    componentDidMount() {
        fetch('')
        .then(res => res.json())
        .then(data => console.log(data))
        var container = document.getElementById('bar');
        var data = {
                categories: ['강남구', '마포구', '종로구', '영등포구', '중구', '강서구', '구로구', '동대문구',
                            '송파구', '강동구', '서초구', '서대문구', '성북구', '동작구', '용산구', '광진구',
                            '관악구', '은평구'],
                series: [
                    {
                        name: 'Houses',
                        data: [6827,1352,649,619,397,139,130,115,88,52,46,45,42,39,28,17,15,13]
                    }
                ]
            };
        var options = {
                chart: {
                    width: 1160,
                    height: 650,
                    title: '서울특별시 자치구별 매물 수 현황',
                    format: ','
                },
                yAxis: {
                    title: ''
                },
                xAxis: {
                    title: '매물 수(개)',
                    min: 0,
                    max: 8000,
                    suffix: ''
                },
                series: {
                    showLabel: true
                },
                legend: {
                    visible: false
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
    
        tui.barChart(container, data, options);
    }
    render() {
        return (
            <div>
                Bars.js를 App.js에 보이도록 이동
            </div>
        );
    }
}
export default Bars;