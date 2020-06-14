import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/bed_cnt_group'

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
            //console.log(pies)
            let one = pies[1]['갯수'];
            let two = pies[0]['갯수'];
            let triple = pies[2]['갯수'];
            let four = pies[3]['갯수'];
            // 전체 개수
            const total_num = one + two + triple + four;
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
                                name: '2인실',
                                data: two
                            },
                            {
                                name: '3인실',
                                data: triple
                            },
                            {
                                name: '4인실',
                                data: four
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: {
                                text: '서울특별시 1~4인실 비율',
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
                            showLegend: true,
                            showLabel: true,
                            labelAlign: 'outer'
                        },
                        tooltip: {
                            suffix: '%'
                        },
                        legend: {
                            visible: false
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
            <div id="bedCnt"></div>
        )
    }
}
export default BedCnts;