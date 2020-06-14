import React, { Component } from 'react';
import tui from 'tui-chart';

//API 설정
const API = 'http://localhost:5000/api/seoul/house_by_district'

class Houses extends Component {
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
                const gangnam = bars[0]['매물'];
                const gangdong = bars[1]['매물'];
                const gangbook = bars[2]['매물'];
                const gangseo = bars[3]['매물'];
                const gwanak = bars[4]['매물'];
                const gwangjin = bars[5]['매물'];
                const guro = bars[6]['매물'];
                const gumchun = bars[7]['매물'];
                const nowon = bars[8]['매물'];
                const dobong = bars[9]['매물'];
                const dongdaemoon = bars[10]['매물'];
                const dongjak = bars[11]['매물'];
                const mapo = bars[12]['매물'];
                const seodaemoon = bars[13]['매물'];
                const seocho = bars[14]['매물'];
                const seongdong = bars[15]['매물'];
                const seongbook = bars[16]['매물'];
                const songpa = bars[17]['매물'];
                const yangcheon = bars[18]['매물'];
                const yeongdungpo = bars[19]['매물'];
                const yongsan = bars[20]['매물'];
                const eunpyeong = bars[21]['매물'];
                const jongro = bars[22]['매물'];
                const jungu = bars[23]['매물'];
                const jungrang = bars[24]['매물'];

                const container = document.getElementById('house');
                let data = {
                        categories: ['마포구', '강남구', '서대문구', '관악구', '광진구', 
                                    '동대문구', '서초구', '용산구', '동작구', '성북구',
                                    '중구', '종로구', '영등포구', '성동구', '구로구', 
                                    '은평구', '노원구', '송파구', '강북구', '강동구', 
                                    '강서구', '중랑구', '도봉구', '양천구', '금천구',],
                        series: [
                            {
                                name: 'house',
                                data: [mapo, gangnam, seodaemoon, gwanak, gwangjin,
                                    dongdaemoon, seocho, yongsan, dongjak, seongbook,
                                    jungu, jongro, yeongdungpo, seongdong, guro,
                                    eunpyeong, nowon, songpa, gangbook, gangdong,
                                    gangseo, jungrang, dobong, yangcheon, gumchun,
                                    ]
                            }
                        ]
                    };
                const options = {
                        chart: {
                            width: 1160,
                            height: 650,
                            title: {
                                text: '서울특별시 자치구별 매물수 현황',
                                align: 'center'
                            },
                            format: ','
                        },
                        yAxis: {
                            title: '자치구',
                        },
                        xAxis: {
                            title: '매물수(개)',
                            min: 0,
                            max: 1000,
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
            <div id="house"></div>
        );
    }
}
export default Houses;