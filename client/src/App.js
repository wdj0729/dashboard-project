import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import Bars from './components/Bars'
import Columns from './components/Columns';
import Donuts from './components/Donuts';
import Lines from './components/Lines';
import Pies from './components/Pies'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Posts />
        <Bars />
        <Columns />
        <Donuts />
        <Lines />
        <Pies />
      </div>
    );
  }
}

export default App;
