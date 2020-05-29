import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/bed_cnt_group'

//변수 초기화
let one=0, two=0, triple=0, four=0, total_num=0;

class BedCnts extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    /*constructor(props) {
        super(props);
    }*/
    componentDidMount(){
        // 외부 라이브러리 연동: D3, masonry, etc
        // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
        // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
        fetch(API)
        .then(res => res.json())
        .then(json =>{
            //json 데이터 저장
            const pies = json;
            const twoObj = pies[0], oneObj = pies[1], tripleObj = pies[2], fourObj = pies[3];
            //console.log(pies)
            //객체에서 각 변수에 갯수만 저장
            for (let prop in oneObj){
                if(prop==='갯수'){
                    one = oneObj[prop];
                    //console.log('one: ' + one)
                }
            }
            for (let prop in twoObj){
                if(prop==='갯수'){
                    two = twoObj[prop];
                    //console.log('two: ' + two)
                }
            }
            for (let prop in tripleObj){
                if(prop==='갯수'){
                    triple = tripleObj[prop];
                    //console.log('triple: ' + triple)
                }
            }
            for (let prop in fourObj){
                if(prop==='갯수'){
                    four = fourObj[prop];
                    //console.log('four: ' + four)
                }
            }
            // 전체 개수
            total_num = one + two + triple + four;
            //console.log('total_num: ' + total_num)
            // 각 인실별 분포율
            one = (one*100)/total_num;
            one = one.toFixed(1);
            two =  (two*100)/total_num;
            two =  two.toFixed(1);
            triple = (triple*100)/total_num;
            triple = triple.toFixed(1);
            four = (four*100)/total_num;
            four = four.toFixed(1)

            const container = document.getElementById('bedCnt');
            let data = {
                        categories: ['bed-cnt'],
                        series: [
                            {
                                name: '1인실',
                                data: one
                            },
                            {
                                name: '4인실',
                                data: four
                            },
                            {
                                name: '2인실',
                                data: two
                            },
                            {
                                name: '3인실',
                                data: triple
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: '서울특별시 1~4인실 점유율',
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
                            labelAlign: 'outer'
                        },
                        tooltip: {
                            suffix: '%'
                        },
                        legend: {
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
            <div>
                BedCnt.js를 App.js에 보이도록 이동
            </div>
        )
    }
}
export default BedCnts;