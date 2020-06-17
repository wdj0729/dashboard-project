import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Peoples from './components/People';
import Houses from './components/House';
import Genders from './components/Gender';
import Deposits from './components/Deposit';
import Deposits1 from './components/Deposit1';
import Deposits2 from './components/Deposit2';
import Deposits3 from './components/Deposit3';
import Deposits4 from './components/Deposit4';
import HouseTypes from './components/HouseType';
import BedCnts from './components/BedCnt';
import Rents from './components/Rent';
import Rents1 from './components/Rent1';
import Rents2 from './components/Rent2';
import Rents3 from './components/Rent3';
import Rents4 from './components/Rent4';
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
    <Genders />
    <Deposits />
    <Deposits1 />
    <Deposits2 />
    <Deposits3 />
    <Deposits4 />
    <Rents />
    <Rents1 />
    <Rents2 />
    <Rents3 />
    <Rents4 />
    <BedCnts />
    <HouseTypes />
    <StickyHeadTable2 />
  </React.StrictMode>,
 document.getElementById('chart'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
