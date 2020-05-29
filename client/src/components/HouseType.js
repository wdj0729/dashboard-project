import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/house_type_distribution'

//변수 초기화
let villa=0, apt=0, guitar=0, house=0, oneroom=0, office=0, total_num=0;

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
            const villaObj = pies[0], aptObj = pies[1], guitarObj = pies[2];
            const houseObj = pies[3], oneroomObj = pies[4], officeObj = pies[5];
            //console.log(pies)
            //객체에서 각 변수에 TOTAL_BED_CNT만 저장
            for (let prop in villaObj){
                if(prop==='TOTAL_BED_CNT'){
                    villa = villaObj[prop];
                    //console.log('villa: ' + villa)
                }
            }
            for (let prop in aptObj){
                if(prop==='TOTAL_BED_CNT'){
                    apt = aptObj[prop];
                    //console.log('apt: ' + apt)
                }
            }
            for (let prop in guitarObj){
                if(prop==='TOTAL_BED_CNT'){
                    guitar = guitarObj[prop];
                    //console.log('guitar: ' + guitar)
                }
            }
            for (let prop in houseObj){
                if(prop==='TOTAL_BED_CNT'){
                    house = houseObj[prop];
                    //console.log('house: ' + house)
                }
            }
            for (let prop in oneroomObj){
                if(prop==='TOTAL_BED_CNT'){
                    oneroom = oneroomObj[prop];
                    //console.log('oneroom: ' + oneroom)
                }
            }
            for (let prop in officeObj){
                if(prop==='TOTAL_BED_CNT'){
                    office = officeObj[prop];
                    //console.log('office: ' + office)
                }
            }
            // 전체 유형별 개수
            total_num = villa + apt + guitar + house + oneroom + office;
            //console.log('total_num: ' + total_num)
            // 각 유형별 점유율
            villa = (villa*100)/total_num;
            villa = villa.toFixed(1);
            apt = (apt*100)/total_num;
            apt = apt.toFixed(1);
            guitar = (guitar*100)/total_num;
            guitar = guitar.toFixed(1);
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
                                name: '빌라',
                                data: villa
                            },
                            {
                                name: '오피스텔',
                                data: office
                            },
                            {
                                name: '아파트',
                                data: apt
                            },
                            {
                                name: '기타',
                                data: guitar
                            },
                            {
                                name: '단독주택',
                                data: house
                            },
                            {
                                name: '원룸',
                                data: oneroom
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: '서울특별시 매물 유형 분포율',
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
                HouseType.js를 App.js에 보이도록 이동
            </div>
        )
    }
}
export default HouseTypes;