import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/deposit_interval'

class Deposits extends Component {
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
            let one= donuts[0]['0~100'];
            let two= donuts[0]['100~200'];
            let three= donuts[0]['200~300'];
            let four= donuts[0]['300~'];
  
            // 전체 개수
            const total_num = one + two + three + four;
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

            const container = document.getElementById('deposit');
            let data = {
                        categories: ['deposit'],
                        series: [
                            {
                                name: '0~100',
                                data: one
                            },
                            {
                                name: '100~200',
                                data: two
                            },
                            {
                                name: '200~300',
                                data: three
                            },
                            {
                                name: '300~400',
                                data: four
                            },
                        ]
                    };
            const options = {
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
            <div id="deposit"></div>
        )
    }
}
export default Deposits;