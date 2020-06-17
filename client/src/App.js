import React, { Component} from 'react';
import './App.css';

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
      fetch('http://localhost:5000/api/sharekim/summary')
      .then(res => res.json())
      .then(json =>{
          //json 데이터 저장
          const seoul = json;
          //console.log(seoul);
          this.setState({
            population: seoul[0]['전체거주예상인원수']
          })
          this.setState({
            houses: seoul[0]['전체매물갯수']
          })
          this.setState({
            deposit: seoul[0]['평균보증금'].toFixed(0)
          })
          this.setState({
            rent: seoul[0]['평균월세'].toFixed(0)
          })
      })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src="logo.png" alt="" title="쉐어하우스 로고"></img>
          <br></br><br></br>
          <h3 className="App-title">쉐어하우스(Sharehouse)<br></br>실시간 현황판</h3>
          <h6 className="App-date">마지막 업데이트: 2020.6.18</h6>
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
                  <p>현재 매물수</p>
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
        <div className="App-menu">
            <button id="btn1">서울특별시 현황</button>
            <button id="btn2">데이터 차트</button>
            <button id="btn3">매물 상세 정보</button>
        </div>
      </div>
    );
  }
}
export default App;
