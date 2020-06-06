import React, { Component} from 'react';
import './App.css';

//API 설정
const API = 'http://localhost:5000/api/seoul/summary'

//Class 구조
class App extends Component {
  /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    constructor(props) {
        super(props);
        this.state ={
          population: 0, houses: 0, deposit: 0, rent: 0
        }
    }
    componentDidMount(){
      // 외부 라이브러리 연동: D3, masonry, etc
      // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
      // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
      fetch(API)
      .then(res => res.json())
      .then(json =>{
          //json 데이터 저장
          const seoul = json;
          //console.log(seoul);
          const seoulObj = seoul[0]
          for (let prop in seoulObj){
            if(prop==='전체거주예상인원수'){
                this.setState({
                  population: seoulObj[prop]
                })
                //console.log('전체거주예상인원수: ' + population)
            }
          }
          for (let prop in seoulObj){
            if(prop==='전체매물갯수'){
                this.setState({
                  houses: seoulObj[prop]
                })
                //console.log('전체매물갯수: ' + houses)
            }
          }
          for (let prop in seoulObj){
            if(prop==='평균보증금'){
                this.setState({
                  deposit: seoulObj[prop].toFixed(0)
                })
                //console.log('평균보증금: ' + deposit)
            }
          }
          for (let prop in seoulObj){
            if(prop==='평균월세'){
                this.setState({
                  rent: seoulObj[prop].toFixed(0)
                })
                //console.log('평균월세: ' + rent)
            }
          }
      })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">쉐어하우스 실시간 현황판</h1>
        </header>
        <div className="App-contatiner">
          <br></br><br></br>
          <div className="App-row">
              <div className="seoul-title">
                  <p>서울특별시</p>
              </div>
              <div className="seoul-population">
                  <p>현재 거주예상 인원수</p>
                  <p className="p-number">{this.state.population.toLocaleString()}</p>
              </div>
              <div className="seoul-house">
                  <p>현재 매물 개수</p>
                  <p className="h-number">{this.state.houses.toLocaleString()}</p>
              </div>
              <div className="seoul-deposit">
                  <p>평균 보증금</p>
                  <p className="d-number">{this.state.deposit.toLocaleString()}</p>
              </div>
              <div className="seoul-rent">
                  <p>평균 월세</p>
                  <p className="r-number">{this.state.rent.toLocaleString()}</p>
              </div>
              <p className="seoul-info">*보증금, 월세 (단위:만원)</p>
              <br></br>
          </div>
        </div>
        <br></br><br></br>
      </div>
    );
  }
}

export default App;
