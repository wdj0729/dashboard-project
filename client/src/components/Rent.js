import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/monthly_rent_interval'

let one=0, two=0, three=0, four=0, five=0, total_num=0;

class Rents extends Component {
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
                if(prop==='0~20'){
                    one = donutObj[prop];
                    //console.log('one: ' + one)
                }
                if(prop==='20~40'){
                    two = donutObj[prop];
                    //console.log('two: ' + two)
                }
                if(prop==='40~60'){
                    three = donutObj[prop];
                    //console.log('three: ' + three)
                }
                if(prop==='60~80'){
                    four = donutObj[prop];
                    //console.log('four: ' + four)
                }
                if(prop==='80~100'){
                    five = donutObj[prop];
                    //console.log('five: ' + five)
                }
            }
            // 전체 개수
            total_num = one + two + three + four + five;
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

            const container = document.getElementById('rent');
            let data = {
                        categories: ['rent'],
                        series: [
                            {
                                name: '0~20',
                                data: one
                            },
                            {
                                name: '20~40',
                                data: two
                            },
                            {
                                name: '40~60',
                                data: three
                            },
                            {
                                name: '60~80',
                                data: four
                            },
                            {
                                name: '80~100',
                                data: five
                            },
                        ]
                    };
            const options = {
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
                Rent.js를 App.js에 보이도록 이동
            </div>
        )
    }
}
export default Rents;