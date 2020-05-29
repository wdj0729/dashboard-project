import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/deposit_interval'

let one=0, two=0, three=0, four=0, total_num=0;

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
            //각 인덱스별 객체에 저장
            const donutObj = donuts[0];
            //console.log(donuts)
            //객체에서 각 변수에 값 저장
            for (let prop in donutObj){
                if(prop==='0~300'){
                    one = donutObj[prop];
                    //console.log('one: ' + one)
                }
                if(prop==='300~500'){
                    two = donutObj[prop];
                    //console.log('two: ' + two)
                }
                if(prop==='500~1000'){
                    three = donutObj[prop];
                    //console.log('three: ' + three)
                }
                if(prop==='1000~'){
                    four = donutObj[prop];
                    //console.log('four: ' + four)
                }
            }
            // 전체 개수
            total_num = one + two + three + four;
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
                                name: '0~300',
                                data: one
                            },
                            {
                                name: '300~500',
                                data: two
                            },
                            {
                                name: '500~1000',
                                data: three
                            },
                            {
                                name: '1000~',
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
            <div>
                Deposit.js를 App.js에 보이도록 이동
            </div>
        )
    }
}
export default Deposits;