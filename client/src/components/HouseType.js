import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/house_type_distribution'

class HouseTypes extends Component {
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
            //각 인덱스별 객체에 저장
            let villa = pies[0]['TOTAL_BED_CNT'];
            let apt = pies[1]['TOTAL_BED_CNT'];
            //let guitar = pies[2]['TOTAL_BED_CNT'];
            let house = pies[3]['TOTAL_BED_CNT'];
            let oneroom = pies[4]['TOTAL_BED_CNT'];
            let office = pies[5]['TOTAL_BED_CNT'];
            // 전체 유형별 개수
            const total_num = villa + apt + house + oneroom + office;
            //console.log('total_num: ' + total_num)
            // 각 유형별 점유율
            villa = (villa*100)/total_num;
            villa = villa.toFixed(1);
            apt = (apt*100)/total_num;
            apt = apt.toFixed(1);
            house = (house*100)/total_num;
            house = house.toFixed(1)
            oneroom = (oneroom*100)/total_num;
            oneroom = oneroom.toFixed(1);
            office = (office*100)/total_num;
            office = office.toFixed(1);

            const container = document.getElementById('houseType');
            let data = {
                        categories: ['house-type'],
                        series: [
                            {
                                name: '아파트',
                                data: apt
                            },
                            {
                                name: '빌라',
                                data: villa
                            },
                            {
                                name: '단독주택',
                                data: house
                            },
                            {
                                name: '원룸 + 오피스텔',
                                data: oneroom + office
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: {
                                text: '서울특별시 매물 유형 분포율',
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
            <div id="houseType"></div>
        )
    }
}
export default HouseTypes;