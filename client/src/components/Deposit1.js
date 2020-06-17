import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/sharekim/deposit_interval_by_roomfor'

class Deposits1 extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    /*constructor(props) {
        super(props);
    }*/
    componentDidMount() {
        fetch(API)
        .then(res => res.json())
        .then(json =>{
            //json 데이터 저장
            const donuts = json;
            //console.log(donuts);
            //각 인덱스별 객체에 저장
            let one= donuts[0]['0~50'];
            let two= donuts[0]['50~100'];
            let three= donuts[0]['100~200'];
            let four= donuts[0]['200~300'];
            let five= donuts[0]['300~'];

            //console.log(one,two,three,four,five);
  
            // 전체 개수
            const total_num = one + two + three + four + five;
            //console.log('total_num: ' + total_num)
            // 각 보증금별 분포율
            one = (one*100)/total_num;
            one = one.toFixed(1);
            two =  (two*100)/total_num;
            two =  two.toFixed(1);
            three =  (three*100)/total_num;
            three =  three.toFixed(1);
            four = (four*100)/total_num;
            four = four.toFixed(1)
            five = (five*100)/total_num;
            five = five.toFixed(1)

            const container = document.getElementById('deposit1');
            let data = {
                        categories: ['deposit1'],
                        series: [
                            {
                                name: '50~100',
                                data: two
                            },
                            {
                                name: '100~200',
                                data: three
                            },
                            {
                                name: '0~50',
                                data: one
                            },
                            {
                                name: '200~300',
                                data: four
                            },
                            {
                                name: '300~',
                                data: five
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: {
                                text: '서울특별시 1인실 보증금 비율',
                                align: 'center'
                            },
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
                        },
                        tooltip: {
                            suffix: '%'
                        },
                        legend: {
                            align: 'bottom'
                        },
                        chartExportMenu: {
                            visible: false
                        }
                    };
            const theme = {
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
            })
    };
    render() {
        return (
            <div id="deposit1"></div>
        )
    }
}
export default Deposits1;