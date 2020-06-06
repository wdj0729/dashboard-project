import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/filled_bedcnt_by_district'

class DistrictTypes extends Component {
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
            //console.log(pies);
            let gangnam = pies[0]['거주예상인원수'];
            //let gangdong = pies[1]['거주예상인원수'];
            //let gangbook = pies[2]['거주예상인원수'];
            //let gangseo = pies[3]['거주예상인원수'];
            let gwanak = pies[4]['거주예상인원수'];
            let gwangjin = pies[5]['거주예상인원수'];
            //let guro = pies[6]['거주예상인원수'];
            //let gumchun = pies[7]['거주예상인원수'];
            let nowon = pies[8]['거주예상인원수'];
            //let dobong = pies[9]['거주예상인원수'];
            let dongdaemoon = pies[10]['거주예상인원수'];
            //let dongjak = pies[11]['거주예상인원수'];
            let mapo = pies[12]['거주예상인원수'];
            let seodaemoon = pies[13]['거주예상인원수'];
            let seocho = pies[14]['거주예상인원수'];
            //let seongdong = pies[15]['거주예상인원수'];
            let seongbook = pies[16]['거주예상인원수'];
            //let songpa = pies[17]['거주예상인원수'];
            //let yangcheon = pies[18]['거주예상인원수'];
            //let yeongdungpo = pies[19]['거주예상인원수'];
            let yongsan = pies[20]['거주예상인원수'];
            //let eunpyeong = pies[21]['거주예상인원수'];
            //let jongro = pies[22]['거주예상인원수'];
            //let jungu = pies[23]['거주예상인원수'];
            //let jungrang = pies[24]['거주예상인원수'];

            const total_num = pies[25]['거주예상인원수'];

            mapo = (mapo*100)/total_num;
            mapo = mapo.toFixed(1);
            dongdaemoon = (dongdaemoon*100)/total_num;
            dongdaemoon = dongdaemoon.toFixed(1);
            seodaemoon = (seodaemoon*100)/total_num;
            seodaemoon = seodaemoon.toFixed(1);
            gangnam = (gangnam*100)/total_num;
            gangnam = gangnam.toFixed(1);
            yongsan = (yongsan*100)/total_num;
            yongsan = yongsan.toFixed(1);
            gwanak = (gwanak*100)/total_num;
            gwanak = gwanak.toFixed(1);
            seocho = (seocho*100)/total_num;
            seocho = seocho.toFixed(1);
            gwangjin = (gwangjin*100)/total_num;
            gwangjin = gwangjin.toFixed(1);
            nowon = (nowon*100)/total_num;
            nowon = nowon.toFixed(1);
            seongbook = (seongbook*100)/total_num;
            seongbook = seongbook.toFixed(1);

            const container = document.getElementById('districtType');
            let data = {
                        categories: ['districtType'],
                        series: [
                            {
                                name: '마포구',
                                data: mapo
                            },
                            {
                                name: '동대문구',
                                data: dongdaemoon
                            },
                            {
                                name: '서대문구',
                                data: seodaemoon
                            },
                            {
                                name: '강남구',
                                data: gangnam
                            },
                            {
                                name: '용산구',
                                data: yongsan
                            },
                            {
                                name: '관악구',
                                data: gwanak
                            },
                            {
                                name: '서초구',
                                data: seocho
                            },
                            {
                                name: '광진구',
                                data: gwangjin
                            },
                            {
                                name: '노원구',
                                data: nowon
                            },
                            {
                                name: '성북구',
                                data: seongbook
                            },
                        ]
                    };
            const options = {
                        chart: {
                            width: 700,
                            height: 700,
                            title: '서울특별시 TOP 10 자치구별 거주예상 인원 분포율 ',
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
            <div id="districtType"></div>
        )
    }
}
export default DistrictTypes;