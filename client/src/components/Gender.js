import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/sharekim/summary_by_district'

class Genders extends Component {
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
            let one=0, two=0, total_num=0;
            for (var i=0; i<25; i++){
                one= one + donuts[i]['M'];
                two= two + donuts[i]['F'];
            }
  
            // 전체 개수
            total_num = one + two;
            //console.log(one, two, total_num);
            // 각 보증금별 분포율
            one = (one*100)/total_num;
            one = one.toFixed(1);
            two =  (two*100)/total_num;
            two =  two.toFixed(1);

            const container = document.getElementById('gender');
            let data = {
                        categories: ['gender'],
                        series: [
                            {
                                name: '여성',
                                data: two
                            },
                            {
                                name: '남성',
                                data: one
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: {
                                text: '서울특별시 거주예상 인원 성비율',
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
            <div id="gender"></div>
        )
    }
}
export default Genders;