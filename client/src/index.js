import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Peoples from './components/People';
import Houses from './components/House';
import Deposits from './components/Deposit';
import HouseTypes from './components/HouseType';
import BedCnts from './components/BedCnt';
import Rents from './components/Rent';
import DistrictType from './components/District'
import StickyHeadTable from './components/Summary';
import StickyHeadTable2 from './components/Summary2';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
 document.getElementById('root'),
);

ReactDOM.render(
  <React.StrictMode>
    <StickyHeadTable />
    <Peoples />
    <DistrictType />
    <Houses />
    <Deposits />
    <Rents />
    <HouseTypes />
    <BedCnts />
    <StickyHeadTable2 />
  </React.StrictMode>,
 document.getElementById('chart'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
