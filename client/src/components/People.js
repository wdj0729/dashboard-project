import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/filled_bedcnt_by_district'

class Peoples extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    /*constructor(props) {
        super(props);
    }*/
    componentDidMount() {
        fetch(API)
        .then(res => res.json())
        .then(json =>{
                const bars = json;
                //console.log(bars);
                const gangnam = bars[0]['거주예상인원수'];
                const gangdong = bars[1]['거주예상인원수'];
                const gangbook = bars[2]['거주예상인원수'];
                const gangseo = bars[3]['거주예상인원수'];
                const gwanak = bars[4]['거주예상인원수'];
                const gwangjin = bars[5]['거주예상인원수'];
                const guro = bars[6]['거주예상인원수'];
                const gumchun = bars[7]['거주예상인원수'];
                const nowon = bars[8]['거주예상인원수'];
                const dobong = bars[9]['거주예상인원수'];
                const dongdaemoon = bars[10]['거주예상인원수'];
                const dongjak = bars[11]['거주예상인원수'];
                const mapo = bars[12]['거주예상인원수'];
                const seodaemoon = bars[13]['거주예상인원수'];
                const seocho = bars[14]['거주예상인원수'];
                const seongdong = bars[15]['거주예상인원수'];
                const seongbook = bars[16]['거주예상인원수'];
                const songpa = bars[17]['거주예상인원수'];
                const yangcheon = bars[18]['거주예상인원수'];
                const yeongdungpo = bars[19]['거주예상인원수'];
                const yongsan = bars[20]['거주예상인원수'];
                const eunpyeong = bars[21]['거주예상인원수'];
                const jongro = bars[22]['거주예상인원수'];
                const jungu = bars[23]['거주예상인원수'];
                const jungrang = bars[24]['거주예상인원수'];

                const container = document.getElementById('people');
                let data = {
                        categories: ['마포구', '동대문구', '서대문구', '강남구', '용산구', 
                                    '관악구', '서초구', '광진구', '노원구', '성북구',
                                    '성동구', '영등포구', '종로구', '송파구', '동작구', 
                                    '중구', '강북구', '구로구', '은평구','중랑구', 
                                    '강동구', '강서구', '도봉구', '양천구', '금천구',],
                        series: [
                            {
                                name: 'people',
                                data: [mapo, dongdaemoon, seodaemoon, gangnam, yongsan,
                                    gwanak, seocho, gwangjin, nowon, seongbook,
                                    seongdong, yeongdungpo, jongro, songpa, dongjak,
                                    jungu, gangbook, guro, eunpyeong, jungrang,
                                    gangdong, gangseo, dobong, yangcheon, gumchun,
                                    ]
                            }
                        ]
                    };
                const options = {
                        chart: {
                            width: 1160,
                            height: 650,
                            title: '서울특별시 거주예상 인원수 현황',
                            format: ','
                        },
                        yAxis: {
                            title: '자치구',
                        },
                        xAxis: {
                            title: '인원수(명)',
                            min: 0,
                            max: 300,
                            suffix: ''
                        },
                        series: {
                            showLabel: true
                        },
                        legend: {
                            visible: false
                        },
                        chartExportMenu: {
                            visible: false
                        }
                    };
                const theme = {
                        series:{
                            series: {
                                colors: [
                                    
                                ]
                                ,
                                label: {
                                    color: '#fff',
                                    fontFamily: 'sans-serif'
                                }
                            }
                        }
                    };
            
                // For apply theme
                tui.registerTheme('myTheme', theme);
                options.theme = 'myTheme';
            
                tui.barChart(container, data, options);
        })
    };
    render() {
        return (
            <div id="people"></div>
        );
    }
}
export default Peoples;