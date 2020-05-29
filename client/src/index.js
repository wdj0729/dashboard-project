import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bars from './components/Bars'
import Columns from './components/Columns';
import Deposits from './components/Deposit';
import Lines from './components/Lines';
import HouseTypes from './components/HouseType';
import BedCnts from './components/BedCnt';
import Rents from './components/Rent'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Bars />
    <Columns />
    <Deposits />
    <Rents />
    <Lines />
    <HouseTypes />
    <BedCnts />
  </React.StrictMode>,
 document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
